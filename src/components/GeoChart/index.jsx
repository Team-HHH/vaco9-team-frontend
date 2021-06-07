import React, { useRef, useEffect, useState } from 'react';
import { select, geoPath, geoMercator, min, max, scaleLinear } from 'd3';

import useResizeObserver from '../useResizeObserver';
import { GeoChart as S } from './styles';

export default function GeoChart({ targetCountries, data, property }) {
  const svgRef = useRef();
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
          `${feature.properties.sovereignt} - ${feature.properties[property]}`
      )
      .attr('x', 10)
      .attr('y', 25);

  }, [data, dimensions, property, selectedCountry]);

  return (
    <S.Container ref={wrapperRef}>
      <S.Map ref={svgRef}></S.Map>
    </S.Container>
  );
}
