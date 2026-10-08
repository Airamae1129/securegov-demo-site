import asyncio
from contextlib import asynccontextmanager
from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

from lib.db import client, db, ensure_indexes


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.index_task = asyncio.create_task(ensure_indexes())
    yield
    client.close()


app = FastAPI(lifespan=lifespan)
api_router = APIRouter(prefix="/api")


class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


class DemoRequestCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    work_email: EmailStr
    company: str = Field(min_length=1, max_length=160)
    company_size: str = Field(min_length=1, max_length=40)
    frameworks: List[str] = Field(default_factory=list)
    consent: bool

class DemoRequest(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    work_email: EmailStr
    company: str
    company_size: str
    frameworks: List[str]
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class DemoRequestResponse(BaseModel):
    id: str
    message: str


class SupportMessageCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    message: str = Field(min_length=1, max_length=2000)
    consent: bool

class SupportMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class SupportMessageResponse(BaseModel):
    id: str
    message: str


@api_router.get("/")
async def root():
    return {"message": "SecureGov demo API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    _ = await db.status_checks.insert_one(status_obj.model_dump())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**sc) for sc in status_checks]


@api_router.post("/demo-requests", response_model=DemoRequestResponse, status_code=201)
async def create_demo_request(input: DemoRequestCreate):
    if not input.consent:
        from fastapi import HTTPException
        raise HTTPException(status_code=422, detail="GDPR consent is required")
    req = DemoRequest(**input.model_dump(exclude={"consent"}))
    await db.demo_requests.insert_one(req.model_dump())
    return DemoRequestResponse(id=req.id, message="Thanks — the CyberHealth team will be in touch within one business day.")

@api_router.get("/demo-requests", response_model=List[DemoRequest])
async def list_demo_requests():
    docs = await db.demo_requests.find().sort("created_at", -1).to_list(500)
    return [DemoRequest(**d) for d in docs]


@api_router.post("/support-messages", response_model=SupportMessageResponse, status_code=201)
async def create_support_message(input: SupportMessageCreate):
    if not input.consent:
        from fastapi import HTTPException
        raise HTTPException(status_code=422, detail="GDPR consent is required")
    msg = SupportMessage(**input.model_dump(exclude={"consent"}))
    await db.support_messages.insert_one(msg.model_dump())
    first = msg.name.split()[0]
    return SupportMessageResponse(id=msg.id, message=f"Thanks {first} — your message is with the CyberHealth team. Someone will reply to {msg.email} within one working day.")

@api_router.get("/support-messages", response_model=List[SupportMessage])
async def list_support_messages():
    docs = await db.support_messages.find().sort("created_at", -1).to_list(500)
    return [SupportMessage(**d) for d in docs]


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)
