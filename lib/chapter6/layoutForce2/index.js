import * as d3 from 'd3';

var svg = d3.select('svg'),
    width = svg.attr('width'),
    height = svg.attr('height');


var simulation = d3.forceSimulation()
    .force('charge', d3.forceManyBody())
    .force('link', d3.forceLink().id(function(d) { return d.id; }))
    .force('center', d3.forceCenter(width / 2, height / 2));
/*     .force('link', )
    .force('charge,')
    .force('center', d3.forceCenter(width / 2, height / 2)); */


d3.json('data/flare.json', function(error, graph) {
    if (error) throw error;

    graph.fixed = true;
    graph.x = width / 2;
    graph.y = height / 2 - 80;
    var nodesData = flatten(graph);
    var linksData = d3.hierarchy(graph).links();



    var link = svg.append('g')
        .attr('class', 'links')
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
        .selectAll('line')
        .data(linksData)
        .enter()
        .append('line');

    var node = svg.append('g')
        .attr('class', 'nodes')
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
        .selectAll('circle')
        .data(nodesData)
        .enter()
        .append('circle')
        .attr('r', function(d) { return d.children ? 4.5 : Math.sqrt(d.size) / 10; })
        .attr('fill', color);


    console.log(nodesData);

    console.log(linksData);

    simulation.nodes(nodesData)
        .on('tick', ticked);

    simulation.force('link')
        .links(linksData);



    function ticked() {
        link.attr('x1', function(d) { return d.source.data.x; })
            .attr('y1', function(d) { return d.source.data.y; })
            .attr('x2', function(d) { return d.target.data.x; })
            .attr('y2', function(d) { return d.target.data.y; });

        node.attr('cx', function(d) { return d.x; })
            .attr('cy', function(d) { return d.y; })

    }


});


// Returns a list of all nodes under the root.
// // function flatten(root) {
// //     var nodes = [],
// //         i = 0;

// //     function recurse(node) {
// //         if (node.children) node.size = node.children.reduce(function(p, v) { return p + recurse(v); }, 0);
// //         if (!node.id) node.id = ++i;
// //         nodes.push(node);
// //         return node.size;
// //     }

// //     root.size = recurse(root);
// //     return nodes;
// }

function flatten(root) {
    // hierarchical data to flat data for force layout
    var nodes = [];

    function recurse(node) {
        if (node.children) node.children.forEach(recurse);
        if (!node.id) node.id = ++i;
        else ++i;
        nodes.push(node);
    }
    recurse(root);
    return nodes;
}

// Color leaf nodes orange, and packages white or blue.
function color(d) {
    return d._children ? "#3182bd" : d.children ? "#c6dbef" : "#fd8d3c";
}