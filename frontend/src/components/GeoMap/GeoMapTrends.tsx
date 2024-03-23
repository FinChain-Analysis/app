import React, { useEffect, useState } from "react";
import { scaleLinear } from "d3-scale";
import {
    ComposableMap,
    Geographies,
    Geography,
    Sphere,
    Graticule
} from "react-simple-maps";
import Api from "../../utils/Api";
import { CURVE_COLOR, SECOND_CURVE_COLOR } from "../../const";
import { getCountryISO3 } from "../../utils/iso-code";

interface CountryValue {
    query: string;
    extracted_value: Number;
}

interface CountryData {
    geo: string;
    values: CountryValue[];
}

const colorScale = scaleLinear()
    .domain([0, 100])
    .range([CURVE_COLOR, SECOND_CURVE_COLOR]);

const GeoMapTrends = () => {
    const [countriesData, setCountriesData] = useState<CountryData[]>([]);

    useEffect(() => {
        const fetchPrice = async () => {
            const geoMap: any = await Api.getGeoMapTrends();
            setCountriesData(geoMap["compared_breakdown_by_region"]);
        };

        fetchPrice();
    }, []);


    return (
        <ComposableMap projectionConfig={{ rotate: [0, 0, 0], scale: 147 }}>
            <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
            {/* <Graticule stroke="#E4E5E6" strokeWidth={0.5} /> */}

            {
                countriesData.length > 0 &&
                (
                    <Geographies geography="/features.json">
                        {({ geographies }) =>
                            geographies.map((geo) => {
                                const DEFAULT_COLOR = "#f5f4f6"

                                const countryData = countriesData.find((s) => getCountryISO3(s.geo) === geo.id);
                                const fill = countryData ? colorScale(countryData.values[0].extracted_value) : DEFAULT_COLOR;

                                if (countryData != null)
                                    console.log(countryData.values[0].extracted_value)

                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill={fill}
                                        stroke="#efedf0"
                                    />
                                );
                            })
                        }
                    </Geographies>
                )
            }
        </ComposableMap>
    );
};

export default GeoMapTrends;