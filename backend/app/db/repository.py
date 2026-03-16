from typing import Any, Optional, TypeVar, Type, List
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

ModelT = TypeVar("ModelT")


class BaseRepository:
    def __init__(self, db: AsyncSession, model: Type):
        self.db = db
        self.model = model

    async def get_by_id(self, id: Any) -> Optional[Any]:
        query = select(self.model).where(self.model.id == id)
        result = await self.db.execute(query)
        return result.scalars().first()

    async def create(self, data: dict) -> Any:
        obj = self.model(**data)
        self.db.add(obj)
        await self.db.commit()
        await self.db.refresh(obj)
        return obj

    async def update(self, id: Any, data: dict) -> Any:
        obj = await self.get_by_id(id)
        for key, value in data.items():
            setattr(obj, key, value)
        await self.db.commit()
        await self.db.refresh(obj)
        return obj
