import * as d3 from 'd3';

var ordinal = d3.scaleOrdinal()
    .domain([1, 2, 3, 4, 5])
    .range([10, 20, 30, 40]);

console.log(ordinal(1)); //10
console.log(ordinal(5)); //10