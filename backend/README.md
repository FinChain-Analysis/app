# Big tool back-end

## Installation

```bash
pip install -r requirements.txt && pip install uvicorn gunicorn
```

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
