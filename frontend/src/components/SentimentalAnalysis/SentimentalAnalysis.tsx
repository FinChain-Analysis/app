import { useEffect, useState } from "react";
import Api from "../../utils/Api";
import { FeelingResponse } from "../../Types/FeelingResponse";
import ReactSpeedometer, { CustomSegmentLabelPosition, Transition } from "react-d3-speedometer"



const SentimentalAnalysis = () => {
    const [feelingData, setFeelingData] = useState<FeelingResponse | undefined>();

    useEffect(() => {
        const fetchPrice = async () => {
            const feeling = await Api.getFeeling();
            setFeelingData(feeling);
        };

        fetchPrice();
    }, []);

    return <ReactSpeedometer
        maxValue={1}
        value={feelingData?.score ?? 0.5}
        needleColor="gray"
        needleTransitionDuration={3000}
        needleTransition={Transition.easeElastic}
        currentValueText={feelingData != undefined ? getLabel(feelingData.score) : "⭕"}
        customSegmentLabels={[
            {
                text: '😱',
                position: CustomSegmentLabelPosition.Outside,
            },
            {
                text: '🫤',
                position: CustomSegmentLabelPosition.Outside,
            },
            {
                text: '😑',
                position: CustomSegmentLabelPosition.Outside,
            },
            {
                text: '😁',
                position: CustomSegmentLabelPosition.Outside,
            },
            {
                text: '🥳',
                position: CustomSegmentLabelPosition.Outside,

            },
        ]}

    />
};

function getLabel(score: number) {
    if (score < 0.2) {
        return "😱"
    }
    else if (score < .4) {
        return "🫤"
    }
    else if (score < .6) {
        return "😑"
    }
    else if (score < .8) {
        return "😁"
    }
    else {
        return "🥳"
    }
}

export default SentimentalAnalysis;