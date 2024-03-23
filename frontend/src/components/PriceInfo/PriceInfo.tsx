import { useState, useEffect } from "react";
import Api from "../../utils/Api";
import { PriceInformation } from "../../Types/PriceInformation";
import imgTezos from '../../assets/tokens/tezos.webp';
import imgUusd from '../../assets/tokens/youves-uusd.webp';
import imgYouves from '../../assets/tokens/youves-you-governance.webp';
import style from './PriceInfo.module.scss';

function PriceInfo() {
    const images: { [key: string]: string } = {
        "tezos": imgTezos,
        "youves-uusd": imgUusd,
        "youves-you-governance": imgYouves,
    }

    const [priceInformation, setPriceInformation] = useState<PriceInformation[]>([]);

    useEffect(() => {
        const fetchPrice = async () => {
            const priceInfo: any = await Api.getPriceInformation();
            setPriceInformation(priceInfo);
        };

        fetchPrice();
    }, []);

    return (
        <section className={style.container}>
            {priceInformation.map((info, index) => (
                <div className={style['price-info']} key={index}>
                    <header>
                        <img className={style['icon']} src={images[info.id]} alt={info.id} />
                        <h3>{info.name ?? info.id}</h3>
                        <span className={style.price}>${info.usd_price}</span>
                    </header>
                    <main>
                        <div className={style['info-item']}>
                            <h4>Market Cap</h4>
                            <span>${info.usd_market_cap}</span>
                        </div>
                        <div className={style['info-item']}>
                            <h4>24h Volume</h4>
                            <span>${info.usd_24h_vol}</span>
                        </div>
                    </main>
                </div>
            ))}
        </section>
    )
}

export default PriceInfo
