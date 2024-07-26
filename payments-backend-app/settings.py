from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    MONGO_DB_HOST: str
    MONGO_DB_PORT: int
    MONGO_DB_USERNAME: str
    MONGO_DB_PASSWORD: str
    VALIDATE_TOKEN_URL: str

    class Config:
        env_file_encoding = "utf-8"


class DevSettings(Settings):
    class Config:
        env_file = "config/.env.dev"

    # 개발 환경에 필요한 추가 설정


class ProdSettings(Settings):
    # 프로덕션 환경에 필요한 추가 설정
    class Config:
        env_file = "config/.env.prod"
