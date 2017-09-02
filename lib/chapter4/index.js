import * as d3 from 'd3';
import chartFactory from '../common/index';

<<<<<<< HEAD
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
=======
const scalesDemo = (enabled => {
    if (enabled) {

    }
})(true);

//three scales to generate data
(function ordinalScales() {
    const chart = chartFactory();
    const data = d3.range(30);
    const colors = d3.scaleOrdinal(d3.schemeCategory10);
    const points = d3.scalePoint()
        .domain(data)
        .range([0, chart.height])
        .padding(1.0);

    const bands = d3.scaleBand()
>>>>>>> ff9f0cd23afa85819397ed0cb721858d8ccef2f4
        .domain(data)
        .range([0, chart.width])
        .padding(0.1);

<<<<<<< HEAD
      chart.container.selectAll('path')
=======
    chart.container.selectAll('path')
>>>>>>> ff9f0cd23afa85819397ed0cb721858d8ccef2f4
        .data(data)
        .enter()
        .append('path')
        .attr('d', d3.symbol()
<<<<<<< HEAD
          .type(d3.symbolCircle)
          .size(10)
=======
            .type(d3.symbolCircle)
            .size(10)
>>>>>>> ff9f0cd23afa85819397ed0cb721858d8ccef2f4
        )
        .attr('transform', d => `translate(${(chart.width / 2)}, ${points(d)})`)
        .style('fill', d => colors(d));

<<<<<<< HEAD
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


=======

    chart.container.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', d => bands(d))
        .attr('y', chart.height / 2)
        .attr('width', bands.bandwidth)
        .attr('height', 10)
        .style('fill', d => colors(d));

    ['10', '20', '20b', '20c'].forEach(function(scheme, index) {
        var selector = `rect.scheme-${scheme}`;
        var schemeCategory = `schemeCategory${scheme}`;
        var colarCategory = d3.scaleOrdinal(d3[schemeCategory]);
        chart.container.selectAll(selector)
            .data(data)
            .enter()
            .append('rect')
            .attr('x', d => bands(d))
            .attr('y', (index * 30) / 2)
            .attr('width', bands.bandwidth)
            .attr('height', 10)
            .style('fill', d => colarCategory(d));
    });
}());
>>>>>>> ff9f0cd23afa85819397ed0cb721858d8ccef2f4
