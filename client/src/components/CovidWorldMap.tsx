import React, { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';

// Define color scale for cases
const colorScale = scaleLinear<string>()
  .domain([0, 1000000, 10000000]) // Adjust based on your dataset
  .range(["#e0f7fa", "#26c6da", "#01579b"]);

const geoUrl =
  "https://raw.githubusercontent.com/subyfly/topojson/master/world-countries.json";


interface CovidWorldMapProps {
  data: any;
}

const CovidWorldMap: React.FC<CovidWorldMapProps> = ({ data }) => {
  const [countryData, setCountryData] = useState<{ [key: string]: number }>({});

  // Map dataset to a dictionary with iso_code as keys for quick lookups
  useEffect(() => {
    const dataMap: { [key: string]: number } = {};
    dataMap[data.iso_code] = data.total_cases;
    setCountryData(dataMap);
  }, [data]);

  return (
    <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
      <h2>COVID-19 World Map</h2>
      <ComposableMap projectionConfig={{ scale: 200 }}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const isoCode = geo.id;
              const cases = countryData[isoCode] || 0;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={colorScale(cases)}
                  onMouseEnter={() => {
                    console.log(`${geo.properties.name}: ${cases} cases`);
                  }}
                  style={{
                    default: { outline: "none" },
                    hover: { fill: "#FF5722", outline: "none" },
                    pressed: { outline: "none" }
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default CovidWorldMap;
