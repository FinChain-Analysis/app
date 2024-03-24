# Big tool back-end

## Installation

```bash
pip install -r requirements.txt && pip install uvicorn gunicorn
```

### Third Parties Auth

The backend is using third parties API that need a auth key.
Create `.env` file containing `CRYPTOPANIC_AUTH` & `SERP_API_KEY`

## Start

```bash
python -m uvicorn main:app --reload
```

## Documentation

The Swagger documentation is available at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

## Generate requirements

```bash
python3 -m  pipreqs.pipreqs .
```
