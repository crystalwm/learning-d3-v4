import * as d3 from 'd3';

var cluster = d3.cluster()
    .size(400, 400);

var g = d3.select('svg').append('g')

d3.json('./data/chapter6-cluster-demo1.json', function(error, data) {


    cluster(data);


    var link = g
        .selectAll('.link')
        .data(data.descendants().slice(1))
        .enter()
        .append('path')
        .attr('class', 'link')
        .attr('d', function(d) {
            return "M" + d.y + "," + d.x +
                "C" + (d.parent.y + 100) + "," + d.x +
                " " + (d.parent.y + 100) + "," + d.parent.x +
                " " + d.parent.y + "," + d.parent.x;
        });

    var node = g.selectAll('.node')
        .data(data.descendants());



})