import { useEffect, useState } from 'react';
import Api from '../../utils/Api';
import style from './GoogleTrends.module.scss';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ChartOptions,
    registerables
} from 'chart.js';
import { CURVE_COLOR, SECOND_CURVE_COLOR, TEXT_COLOR } from '../../const';
import 'chartjs-adapter-date-fns';

ChartJS.register(...registerables);

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

    const data = {
        datasets: trends?.interest_over_time.averages.map((a: any, i: number) => ({
            label: a.query,
            data: trends.interest_over_time.timeline_data.map((t: any) => ({ x: new Date(t.timestamp * 1000), y: t.values[i].value })),
        })) ?? [],
    };

    const options: ChartOptions<"line"> = {
        responsive: true,
        color: TEXT_COLOR,
        borderColor: [CURVE_COLOR, SECOND_CURVE_COLOR] as any,
        elements: {
            point: {
                radius: 0,
            },
        },
        scales: {
            x: {
                border: {
                    display: false,
                },
                grid: {
                    display: false,
                },
                type: 'time',
                time: {
                    unit: 'month',
                    displayFormats: {
                        month: 'MMM. yyyy',
                    },
                    tooltipFormat: 'PP',
                },
                ticks: {
                    maxTicksLimit: 6,
                    color: TEXT_COLOR,
                }
            },
            y: {
                border: {
                    display: false,
                    dash: [2, 5],
                },
                ticks: {
                    color: TEXT_COLOR,
                }
            }
        }
    };

    return (
        <section className={style.container} id='google-trends'>
            <Line data={data} options={options} />
        </section>
    )
}

export default GoogleTrends;