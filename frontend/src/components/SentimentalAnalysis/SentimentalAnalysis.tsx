import { useEffect, useState } from "react";
import Api, { FeelingResponse } from "../../utils/Api";
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
        currentValueText={feelingData != undefined ? getLabel(feelingData) : "⭕"}
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
    if (score < 20) {
        return "😱"
    }
    else if (score < 40) {
        return "🫤"
    }
    else if (score < 60) {
        return "😑"
    }
    else if (score < 80) {
        return "😁"
    }
    else {
        return "🥳"
    }
}

export default SentimentalAnalysis;