import * as d3 from 'd3';


/*
var ordinal = d3.scaleOrdinal()
    .domain([1, 2, 3, 4, 5])
    .range([10, 20, 30, 40]);

console.log(ordinal(1)); //10
console.log(ordinal(5)); //10
*/

var color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
console.log(color.domain()); //[]

console.log(color(1)); //#98abc5
console.log(color(8));  //#8a89a6
console.log(color(2));  //#7b6888
console.log(color.domain()); //[1,8,2]
