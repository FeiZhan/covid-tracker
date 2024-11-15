import React, { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';
import { Tooltip, Typography } from '@mui/material';
import { DataItem } from '../types/DataItem';

const colorScale = scaleLinear<string>()
  .domain([0, 1000000, 10000000]) // Adjust based on your dataset
  .range(["#e0f7fa", "#26c6da", "#01579b"]);

const geoUrl =
  "https://raw.githubusercontent.com/subyfly/topojson/master/world-countries.json";

interface CovidWorldMapProps {
  column: string; // The column parameter is used instead of country
  endDate: string; // The endDate parameter is now required
  onCountrySelect: (countryName: string) => void; // Callback to update the filter
}

const CovidWorldMap: React.FC<CovidWorldMapProps> = ({ column, endDate, onCountrySelect }) => {
  const [countryData, setCountryData] = useState<{ [key: string]: number }>({});
  const [tooltipContent, setTooltipContent] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (column && endDate) {
      setLoading(true);
      fetch(`http://localhost:5000/api/covid?column=${column}&endDate=${endDate}`)
        .then((response) => response.json())
        .then((data: DataItem[]) => {
          const dataMap: { [key: string]: number } = {};
          data.forEach((item) => {
            dataMap[item.iso_code] = parseInt(item[column]);
          });
          setCountryData(dataMap);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [column, endDate]);

  const handleMouseEnter = (event: React.MouseEvent, countryData: any) => {
    setTooltipContent(`Country: ${countryData.location}, ${column}: ${countryData[column]}`);
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setTooltipContent(""); // Clear tooltip content
  };

  const handleCountryClick = (countryName: string) => {
    onCountrySelect(countryName); // Update filter with selected country name
  };

  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <h2>COVID-19 World Map</h2>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <ComposableMap projectionConfig={{ scale: 200 }}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const isoCode = geo.id;
                const value = countryData[isoCode] || 0;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={colorScale(value)}
                    onMouseEnter={(event) =>
                      handleMouseEnter(event, { iso_code: isoCode, [column]: value, location: geo.properties.name })
                    }
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleCountryClick(geo.properties.name)} // Drill-down with filter update
                    style={{
                      default: { outline: 'none' },
                      hover: { fill: '#FF5722', outline: 'none' },
                      pressed: { fill: '#E42', outline: 'none' },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      )}

      <Tooltip
        open={!!tooltipContent}
        title={<Typography>{tooltipContent}</Typography>}
        placement="top"
        style={{
          position: 'absolute',
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
