/**
* Chapter 4
*/

import * as d3 from 'd3';
import * as topojson from 'topojson';
import * as Rx from 'rxjs';
import { csvParseRows, csvParse } from 'd3-dsv';
import chartFactory from '../common/index';

const scalesDemo = ((enabled) => {
  if (enabled) {
    const chart = chartFactory();

    (function ordinalScales() {
      const data = d3.range(30);
      const colors = d3.scaleOrdinal(d3.schemeCategory10);
      const points = d3.scalePoint()
        .domain(data)
        .range([0, chart.height])
        .padding(0.5);

      const bands = d3.scaleBand()
        .domain(data)
        .range([0, chart.width])
        .padding(0.1);

      chart.container.selectAll('path')
        .data(data)
        .enter()
        .append('path')
        .attr('d', d3.symbol()
          .type(d3.symbolCircle)
          .size(10)
        )
        .attr('transform', d => `translate(${(chart.width / 2)}, ${points(d)})`)
        .style('fill', d => colors(d));

      ['10', '20', '20b', '20c'].forEach((scheme, i) => {
        const height = 10;
        const padding = 5;
        const categoryScheme = `schemeCategory${scheme}`;
        const selector = `rect.scheme-${scheme}`;
        const categoryColor = d3.scaleOrdinal(d3[categoryScheme]);

        chart.container.selectAll(selector)
          .data(data.slice())
          .enter()
          .append('rect')
          .classed(selector, true)
          .attr('x', d => bands(d))
          .attr('y', (chart.height / 2) - ((i * height) + (padding * i)))
          .attr('width', bands.bandwidth)
          .attr('height', height)
          .style('fill', d => categoryColor(d));
      });
    }());
  }
})(false);


