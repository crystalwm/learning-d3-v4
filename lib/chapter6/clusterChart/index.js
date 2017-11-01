import * as d3 from 'd3';

var cluster = d3.tree()
    .size(400, 400);

var stratify = d3.stratify();

var g = d3.select('svg').append('g')

d3.json('./data/chapter6-cluster-demo1.json', function (error, data) {


   var root=d3.hierarchy(data)
   .sum(function(d) { return d.value ? 1 : 0; });

   console.log(root);

  cluster(root);

  console.log(root);




    var link = g
        .selectAll('.link')
        .data(root.descendants().slice(1))
        .enter()
        .append('path')
        .attr('class', 'link')
        .attr('d', function (d) {
            return "M" + d.y + "," + d.x +
                "C" + (d.parent.y + 100) + "," + d.x +
                " " + (d.parent.y + 100) + "," + d.parent.x +
                " " + d.parent.y + "," + d.parent.x;
        });

    var node = g.selectAll('.node')
        .data(root.descendants()).enter();







})