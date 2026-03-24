from typing import Optional
from pydantic import BaseModel


class RegisterRequest(BaseModel):
    email: str
    password: str
    first_name: str
    last_name: str
    middle_name: Optional[str] = None
    role: str
    level: Optional[str] = None


class VerifyEmailRequest(BaseModel):
    token: str


class Verify2FARequest(BaseModel):
    session_id: str
    code: str


class PasswordResetRequest(BaseModel):
    email: str


class ChangeEmailRequest(BaseModel):
    new_email: str
    password: str


class ProfileUpdateRequest(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    middle_name: Optional[str] = None


class Enable2FARequest(BaseModel):
    password: str


class Confirm2FARequest(BaseModel):
    code: str


class Disable2FARequest(BaseModel):
    password: str


class ChangeRoleRequest(BaseModel):
    role: str
    level: Optional[str] = None


class ChangeStatusRequest(BaseModel):
    status: str
    reason: Optional[str] = None


class ChangePasswordRequest(BaseModel):
    old_password: Optional[str] = None
    new_password: str
    reset_token: Optional[str] = None


class RefreshRequest(BaseModel):
    refresh_token: str


class LoginRequest(BaseModel):
    email: str
    password: str


class UserResponse(BaseModel):
    id: str
    email: str
    first_name: str
    last_name: str
    role: str
    level: Optional[str] = None


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "Bearer"
    expires_in: int
    user: UserResponse
