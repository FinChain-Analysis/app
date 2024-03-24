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

# Devlog

## Getting trends from google

At first, we were displaying trends using an <iframe> but for performance and esthetic reason, we tried to :

1. got the data from an API. So we used [pytrends](https://github.com/GeneralMills/pytrends/tree/master), but it is deprecated because in one call we got a 429 error.
2. Than, we used SERP api
3. But because of the rate limit (100 req/month), we cached the result in a json file.
