import * as d3 from 'd3';
var scores = [
    { name: 'Alice', score: 96 },
    { name: 'Billy', score: 83 },
    { name: 'Cindy', score: 91 },
    { name: 'David', score: 96 },
    { name: 'Emily', score: 88 }
];


var update = d3.select('.chart')
    .selectAll('div')
    .data(scores, function (d) {
        return d ? d.name : this.innerText;
    })
    .style('color', 'blue');

console.log(update);
/* var update = d3.select('.chart')
    .selectAll('div')
    .data(scores)
    .style('color', 'blue');

console.log(update);  */

var enter = update.enter()
    .append('div')
    .text(function (d) {
        return d.name;
    })
    .style('color', 'green');

var exit = update.exit()
    .style('color', 'red');

//update.exit().remove();

update.merge(enter)
    .style('width', d => d.score + 'px')
    .style('height', '50px')
    .style('background', 'lightgreen')
    .style('border', '1px solid black')