from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    storage_backend: str = "memory"
    database_url: str = "sqlite:///./solidarian_ai.db"

    sbert_model_name: str = (
        "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"
    )
    sbert_device: str = "cpu"
    precompute_on_startup: bool = True

    default_top_k: int = 5
    tfidf_max_features: int = 50000
    tfidf_ngram_min: int = 1
    tfidf_ngram_max: int = 2


settings = Settings()
