import aiohttp
import json
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/price")
async def _():

    async with aiohttp.ClientSession() as session:

        token_ids = "tezos,youves-you-governance,youves-uusd"
        url = f"https://api.coingecko.com/api/v3/simple/price?ids={token_ids}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true"

        response = await session.get(url)
        price_info = await response.json()

        result = {}

        for token_id in token_ids.split(","):
            if token_id in price_info:

                price_data = price_info[token_id]

                result[token_id] = {
                    "usd_price": price_data["usd"],
                    "usd_market_cap": round(price_data.get("usd_market_cap", 0), 2),
                    "usd_24h_vol": round(price_data.get("usd_24h_vol", 0), 2),
                }

            else:
                print(f"\nPas d'informations trouvées pour le token: {token_id}")

        # 🤮 we hardcoded this value because coingecko returns 0.
        result["youves-uusd"]["usd_market_cap"] = 6_940_000 # read from https://coinmarketcap.com/fr/currencies/youves/

        return result

@app.get("/trends/interest_over_time/you_gouvernance+uusd")
async def _():
    with open("files/trends/interest_over_time/you_gouvernance+uusd.json") as f:
        return json.load(f)
    
@app.get("/trends/geomap/you_gouvernance+uusd")
async def _():
    with open("files/trends/geomap/you_gouvernance+uusd.json") as f:
        return json.load(f)

@app.get("/feeling")
async def _():

    def is_article_good(article):
        votes = article["votes"]

        good = votes["positive"]+votes["saved"]
        bad = votes["disliked"]+votes["negative"]+votes["toxic"]

        if good>bad:
            return True
        else:
            return False        

    def calculate_feeling_score(articles):
        total_articles = len(articles)
        if total_articles == 0:
            return 0  # Avoid division by zero        

        good_articles_count = sum(1 for article in articles if is_article_good(article))
        
        return good_articles_count / total_articles

    async with aiohttp.ClientSession() as session:
        urlCrypto = f"https://cryptopanic.com/api/v1/posts/?auth_token={os.environ["CRYPTOPANIC_AUTH"]}&currencies=BTC,ETH,XRP&filter=hot"
        response = await session.get(urlCrypto)
        data = await response.json()

        return {
            "lastestArticles": data["results"][:5],
            "score": calculate_feeling_score(data["results"])
        }