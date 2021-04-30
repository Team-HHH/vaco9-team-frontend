import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { select, geoPath, geoMercator, min, max, scaleLinear } from 'd3';
import useResizeObserver from './useResizeObserver';

const targetCountries = {
  'South Korea': { click: 3000, reach: 450000 },
  'Japan': { click: 5000, reach: 45000 },
  'China': { click: 30000, reach: 450000 },
  'United States of America': { click: 60000, reach: 800000 },
  'India': { click: 100000, reach: 800000 },
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
`;

const Map = styled.svg`
  display: block;
  width: 100%;
  height: 100%;
`;

export default function GeoChart({ data, property }) {
  const svgRef = useRef();
  const tltpRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    for (let i = 0; i < data.features.length; i++) {
      const country = data.features[i].properties.sovereignt;

      if (targetCountries[country]) {
        const reach = targetCountries[country].reach;
        const click = targetCountries[country].click;

        data.features[i].properties = { ...data.features[i].properties, reach, click };
      } else {
        data.features[i].properties.reach = 0;
        data.features[i].properties.click = 0;
      }
    }

    const svg = select(svgRef.current);
    const minProp = min(data.features, feature => feature.properties[property]);
    const maxProp = max(data.features, feature => feature.properties[property]);
    const colorScale = scaleLinear()
      .domain([minProp, maxProp])
      .range(['#efefef', 'green']);

    const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();
    const projection = geoMercator()
      .fitSize([width, height], selectedCountry || data)
      .precision(100);
    const pathGenerator = geoPath().projection(projection);

    svg
      .selectAll('.country')
      .data(data.features)
      .join('path')
      .on('click', feature => {
        const selected = feature.target.__data__;

        setSelectedCountry(selectedCountry === selected ? null : selected);
      })
      .attr('class', 'country')
      .attr('fill', feature => colorScale(feature.properties[property]))
      .attr('d', feature => pathGenerator(feature));

    svg
      .selectAll('.label')
      .data([selectedCountry])
      .join('text')
      .attr('class', 'label')
      .text(
        feature =>
          feature &&
          '도달수: ' +
          feature.properties['reach'] +
          '클릭수' +
          ': ' +
          feature.properties['click']
      )
      .attr('x', 10)
      .attr('y', 25);

  }, [data, dimensions, property, selectedCountry]);

  return (
    <Container ref={wrapperRef}>
      <Map ref={svgRef}></Map>
    </Container>
  );
}
