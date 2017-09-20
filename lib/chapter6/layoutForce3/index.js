import * as d3 from 'd3';

var width = 960,
  height = 600;
var i = 0;
var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height)
  .call(d3.zoom().scaleExtent([1 / 2, 8]).on("zoom", zoomed))
  .append("g")
  .attr("transform", "translate(40,0)");

function zoomed() {
  svg.attr("transform", d3.event.transform);
}

var simulation = d3.forceSimulation()
  .force("link", d3.forceLink().id(function (d) { return d.id; }))
  .force("charge", d3.forceManyBody())
  .force("center", d3.forceCenter(width / 2, height / 2));


d3.json('data/network.json', function (error, root) {
  if (error) throw error;
  //initialising hierarchical data
  root = d3.hierarchy(root);
  var nodes = flatten(root);
  var links = root.links();
  var transform = d3.zoomIdentity;;
  var nodeSvg, linkSvg, nodeEnter, linkEnter;


  nodeSvg = svg.selectAll(".node")
    .data(nodes);
  nodeSvg.exit().remove();
  nodeSvg = nodeSvg.enter()
    .append("g")
    .attr("class", "node")
    .on("click", click)
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));

  nodeSvg.append("circle")
    .attr("r", function (d) { return d.children ? 8 : 4; })
    .attr('fill', function (d) { return d.children ? 'burlywood' : 'coral'; })
    .append("title")
    .text(function (d) { return d.data.name; })

  nodeSvg.append("text")
    .attr("dy", 3)
    .attr("x", function (d) { return d.children ? -8 : 8; })
    .style("text-anchor", function (d) { return d.children ? "end" : "start"; })
    .text(function (d) { return d.data.name; });

  linkSvg = svg.selectAll(".link")
    .data(links) //, function(d) { return d.target.id; })

  linkSvg.exit().remove();

  linkSvg = linkSvg.enter()
    .append("line")
    .attr("class", "link");


  simulation
    .nodes(nodes)
    .on("tick", ticked);

  simulation.force("link")
    .links(links);



  function ticked() {
    linkSvg
      .attr("x1", function (d) { return d.source.x; })
      .attr("y1", function (d) { return d.source.y; })
      .attr("x2", function (d) { return d.target.x; })
      .attr("y2", function (d) { return d.target.y; });

    nodeSvg
      .attr("transform", function (d) { return "translate(" + d.x + ", " + d.y + ")"; });
  }


});




function click(d) {
  if (d.children) {
    d._children = d.children;
    d.children = null;

  } else {
    d.children = d._children;
    d._children = null;

  }
}

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}
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
