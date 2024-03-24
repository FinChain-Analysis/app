import { PriceInformation } from "../Types/PriceInformation";
import { FeelingResponse } from "../Types/FeelingResponse";
import { Name } from "../Types/Name";

export default class Api {
    /**
     * get price informations
     * @returns {Promise<PriceInformation[]>}
     */
    static async getPriceInformation(): Promise<PriceInformation[]> {
        const data: any = await fetch(import.meta.env.VITE_API_URL + "/price")
            .then((response) => response.json());

        const priceInfo: PriceInformation[] = [];
        Object.keys(data).forEach((key) => {
            priceInfo.push({
                id: key,
                name: Name[key as keyof typeof Name] ?? undefined,
                usd_price: data[key].usd_price,
                usd_market_cap: data[key].usd_market_cap,
                usd_24h_vol: data[key].usd_24h_vol
            });
        });

        return priceInfo;
    }

    /**
     * Get trends informations
     * @returns {Promise<any>}
     */
    static async getTrends(): Promise<any> {
        return await fetch(import.meta.env.VITE_API_URL + "/trends/interest_over_time/you_gouvernance+uusd")
            .then((response) => response.json());
    }

    /**
     * Get geo map trends
     * @returns {Promise<any>}
     */
    static async getGeoMapTrends(): Promise<any> {
        return await fetch(import.meta.env.VITE_API_URL + "/trends/geomap/you_gouvernance+uusd")
            .then((response) => response.json());
    }

    /**
     * Get feeling informations
     * @returns {Promise<FeelingResponse>}
     */
    static async getFeeling(): Promise<FeelingResponse> {
        return await fetch(import.meta.env.VITE_API_URL + "/feeling")
            .then((response) => response.json());
    }
}