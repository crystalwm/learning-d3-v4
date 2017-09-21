import * as d3 from 'd3';

var svg = d3.select('svg'),
    width = svg.attr('width'),
    height = svg.attr('height');




var simulation = d3.forceSimulation()
    .force('charge', d3.forceManyBody(function(d) { return d.children ? -Math.pow(d.data.size, 1 / 100) / 1000 : -50; }))
    .force('link', d3.forceLink().id(function(d) { return d.id; }))
    .force('center', d3.forceCenter(width / 2, height / 2));



d3.json('data/flare.json', function(error, graph) {
    if (error) throw error;


    graph = d3.hierarchy(graph);
    var nodesData = flatten(graph);
    var linksData = graph.links();



    var link = svg.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(linksData)
        .enter()
        .append('line');

    var node = svg.append('g')
        .attr('class', 'nodes')
        .selectAll('circle')
        .data(nodesData)
        .enter()
        .append('circle')
        .attr('r', function(d) { return d.children ? 4.5 : Math.sqrt(d.data.size) / 10;; })
        .attr('fill', color);



    simulation.nodes(nodesData)
        .on('tick', ticked);

    simulation.force('link')
        .distance(function(d) {
            return d.target.children ? 50 : 30;
        })
        .links(linksData);


    function ticked() {
        link.attr('x1', function(d) { return d.source.x; })
            .attr('y1', function(d) { return d.source.y; })
            .attr('x2', function(d) { return d.target.x; })
            .attr('y2', function(d) { return d.target.y; });

        node.attr('cx', function(d) { return d.x; })
            .attr('cy', function(d) { return d.y; })
    }
});


// Returns a list of all nodes under the root.
function flatten(root) {
    var nodes = [],
        i = 0;

    function recurse(node) {
        if (node.children) node.size = node.children.reduce(function(p, v) { return p + recurse(v); }, 0);
        if (!node.id) node.id = ++i;
        nodes.push(node);
        return node.size;
    }
    root.size = recurse(root);
    return nodes;
}



// Color leaf nodes orange, and packages white or blue.
function color(d) {
    return d._children ? "#3182bd" : d.children ? "#c6dbef" : "#fd8d3c";
}