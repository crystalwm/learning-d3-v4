import * as d3 from 'd3';

var svg = d3.select('svg');
var width = svg.attr('width');
var height = svg.attr('height');

var color = d3.scaleOrdinal(d3.schemeCategory20);

var pack = d3.pack()
    .size([400, 400]);


d3.csv('./data/chapter6-bubbleChart-star.csv', function(error, values) {
    if (error) return;

    var root = d3.hierarchy({ children: values })
        .sum(d => d.value)
        .each(d => {
            var values = d.data;
            d.name = values.name;
        });

    var node = d3.select('svg').selectAll('.circle')
        .data(pack(root).leaves())
        .enter()
        .append('g');

    node.append('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', (d) => Math.pow(d.value, 2) > 30 ? Math.pow(d.value, 2) : 30)
        .style('fill', d => color(d.value));

    node.append('text')
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .attr('dx', () => -20)
        .attr('dy', () => 3)
        .text(d => d.name);

});