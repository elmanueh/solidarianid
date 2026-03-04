# SolidarianAI Recommender

Microservicio FastAPI para recomendación de causas solidarias con dos enfoques:

- Baseline clásico: TF-IDF + similitud coseno.
- Semántico: Sentence-Transformers + similitud coseno sobre embeddings normalizados.

## Endpoints

- `GET /health`: estado del servicio.
- `POST /v1/causes/sync`: sincroniza causas y opcionalmente reconstruye índices.
- `POST /v1/recommendations`: devuelve ranking Top-K con `tfidf` o `sbert`.
- `POST /v1/recommendations/compare`: compara TF-IDF vs SBERT con `overlap@k`, tiempos y memoria.

## Ejecutar

1. Instalar dependencias:
   - `uv sync`
2. Levantar API:
   - `uv run uvicorn app.main:app --reload`
3. Abrir documentación automática:
   - `http://127.0.0.1:8000/docs`

## Configuración

Usa `.env.example` como base para `.env`.

Variables principales:

- `STORAGE_BACKEND=memory|sql`
- `DATABASE_URL=sqlite:///./solidarian_ai.db`
- `SBERT_MODEL_NAME=sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2`
- `SBERT_DEVICE=cpu|cuda`
- `DEFAULT_TOP_K=5`

## Pruebas rápidas

- `uv run pytest -q`
