import { useEffect, useState } from 'react';
import Api from '../../utils/Api';
import style from './GoogleTrends.module.scss';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
    PointElement,
    LineElement
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement
);

function GoogleTrends() {
    const [trends, setTrends] = useState<any>(undefined);

    useEffect(() => {
        const fetchTrends = async () => {
            const trendsInfo: any = await Api.getTrends();
            console.log(trendsInfo.interest_over_time.timeline_data);
            setTrends(trendsInfo);
        };

        fetchTrends();
    }, []);

    const labels = Array.from({ length: 53 }, (_, i) => (i + 1).toString());

    console.log(trends);

    const data = {
        labels: labels,
        datasets: trends?.interest_over_time.averages.map((a: any, i: number) => ({
            label: a.query,
            data: trends.interest_over_time.timeline_data.map((t: any) => t.values[i].value),
        })) ?? [],
    };

    const options: ChartOptions<"line"> = {};

    return (
        <section className={style.container} id='google-trends'>
            <Line data={data} options={options} />
        </section>
    )
}

export default GoogleTrends;