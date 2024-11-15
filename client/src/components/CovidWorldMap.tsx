import React, { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';
import { Tooltip, Typography } from "@mui/material";
import { DataItem } from '../types/DataItem'; // Import types

// Define color scale for cases
const colorScale = scaleLinear<string>()
  .domain([0, 1000000, 10000000]) // Adjust based on your dataset
  .range(["#e0f7fa", "#26c6da", "#01579b"]);

const geoUrl =
  "https://raw.githubusercontent.com/subyfly/topojson/master/world-countries.json";


interface CovidWorldMapProps {
  data: DataItem;
}

const CovidWorldMap: React.FC<CovidWorldMapProps> = ({ data }) => {
  const [countryData, setCountryData] = useState<{ [key: string]: number }>({});
  const [tooltipContent, setTooltipContent] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Map dataset to a dictionary with iso_code as keys for quick lookups
  useEffect(() => {
    const dataMap: { [key: string]: number } = {};
    dataMap[data.iso_code] = parseInt(data.total_cases);
    setCountryData(dataMap);
  }, [data]);

  const handleMouseEnter = (event: React.MouseEvent, countryData: DataItem) => {
    setTooltipContent(`Country: ${countryData.location}, Cases: ${countryData.total_cases}`);
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    //setTooltipContent("");
  };

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
                  
                  onMouseEnter={(event) => handleMouseEnter(event, data)}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    default: { outline: "none" },
                    hover: { fill: "#FF5722", outline: "none" },
                    pressed: { fill: "#E42", outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      <Tooltip
        open={!!tooltipContent}
        title={<Typography>{tooltipContent}</Typography>}
        placement="top"
        style={{
          position: "absolute",
          left: mousePosition.x + 15,
          top: mousePosition.y + 15,
        }}
      >
        <div />
      </Tooltip>
    </div>
  );
};

export default CovidWorldMap;
