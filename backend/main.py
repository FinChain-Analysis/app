import aiohttp
import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


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

@app.get("/trends")
async def _():
    with open("files/trends_you_gouvernance+uusd.json") as f:
        return json.load(f)