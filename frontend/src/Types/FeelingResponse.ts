import { FeelingArticle } from "./FeelingArticle";

export interface FeelingResponse {
    score: number;
    latestArticles: FeelingArticle[];
}