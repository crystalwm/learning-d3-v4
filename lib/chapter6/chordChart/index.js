import * as d3 from 'd3';

var color = d3.scaleOrdinal()
    .domain(d3.range(5))
    .range(["#000000", "#FFDD89", "#957244", "#F26223", "#FFFFFF"]);


var arc = d3.arc()
    .innerRadius(10);

var maxtrix = [
    [132, 241, 13, 215, 65],
    [105, 111, 156, 365, 47],
    [28, 168, 354, 79, 149],
    [115, 152, 124, 154, 168],
    [54, 387, 160, 138, 98]
];

var i = ['细胞1', '细胞2', '细胞3', '细胞4', '细胞5'];
var j = ['染色体1', '染色体2', '染色体3', '染色体4', '染色体5'];

var chord = d3.chord()
    .padAngle(0.5);

var ribbon = d3.ribbon();

var svg = d3.select('svg')
    .append('g')
    .datum(chord(maxtrix));