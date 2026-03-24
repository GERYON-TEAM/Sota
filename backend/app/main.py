import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from sqlalchemy import text
from slowapi.errors import RateLimitExceeded

from app.db.models import Base
from app.db.session import engine, async_session
from app.api.routers import auth, specialists, projects, admin
from app.core.limiter import limiter

logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with async_session() as session:
        await session.execute(text("SELECT 1"))
        logger.info("БД подключена")

    yield

    await engine.dispose()


app = FastAPI(title="SOTA Backend", lifespan=lifespan)
app.state.limiter = limiter


def rate_limit_handler(request: Request, exc: RateLimitExceeded):
    return JSONResponse(
        status_code=429,
        content={"detail": "Слишком много запросов, попробуйте позже"},
    )


app.add_exception_handler(RateLimitExceeded, rate_limit_handler)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(specialists.router, prefix="/api/specialists", tags=["specialists"])
app.include_router(projects.router, prefix="/api/projects", tags=["projects"])
app.include_router(admin.router, prefix="/api/admin", tags=["admin"])


@app.get("/health")
async def health():
    return {"status": "ok"}
