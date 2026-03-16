from fastapi import HTTPException


class NotFoundError(HTTPException):
    def __init__(self, detail: str = "Не найдено"):
        super().__init__(status_code=404, detail=detail)


class AlreadyExistsError(HTTPException):
    def __init__(self, detail: str = "Уже существует"):
        super().__init__(status_code=400, detail=detail)


class AuthenticationError(HTTPException):
    def __init__(self, detail: str = "Ошибка аутентификации"):
        super().__init__(status_code=401, detail=detail)


class ForbiddenError(HTTPException):
    def __init__(self, detail: str = "Доступ запрещён"):
        super().__init__(status_code=403, detail=detail)


class ConflictError(HTTPException):
    def __init__(self, detail: str = "Конфликт состояний"):
        super().__init__(status_code=409, detail=detail)
