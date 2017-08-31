import * as d3 from 'd3';
import * as topojson from 'topojson';
import * as Rx from 'rxjs';
import {
    csvParseRows,
    csvParse
} from 'd3-dsv';
import chartFactory from '../../common/index';


var nodes = [
    { "id": "Myriel", "group": 1 },
    { "id": "Napoleon", "group": 1 },
    { "id": "Mlle.Baptistine", "group": 1 },
    { "id": "Mme.Magloire", "group": 1 },
    { "id": "CountessdeLo", "group": 1 },
    { "id": "Geborand", "group": 1 },
    { "id": "Champtercier", "group": 1 },
    { "id": "Cravatte", "group": 1 },
    { "id": "Count", "group": 1 },
    { "id": "OldMan", "group": 1 },
    { "id": "Labarre", "group": 2 },
    { "id": "Valjean", "group": 2 },
    { "id": "Marguerite", "group": 3 },
    { "id": "Mme.deR", "group": 2 },
    { "id": "Isabeau", "group": 2 },
    { "id": "Gervais", "group": 2 },
    { "id": "Tholomyes", "group": 3 },
    { "id": "Listolier", "group": 3 },
    { "id": "Fameuil", "group": 3 },
    { "id": "Blacheville", "group": 3 },
    { "id": "Favourite", "group": 3 },
    { "id": "Dahlia", "group": 3 },
    { "id": "Zephine", "group": 3 },
    { "id": "Fantine", "group": 3 },
    { "id": "Mme.Thenardier", "group": 4 }];
var links = [
    { "source": "Napoleon", "target": "Myriel", "value": 1 },
    { "source": "Mlle.Baptistine", "target": "Myriel", "value": 4 },
    { "source": "Mme.Magloire", "target": "Myriel", "value": 4 },
    { "source": "Mme.Magloire", "target": "Mlle.Baptistine", "value": 2 },
    { "source": "CountessdeLo", "target": "Myriel", "value": 1 },
    { "source": "Geborand", "target": "Myriel", "value": 1 },
    { "source": "Champtercier", "target": "Myriel", "value": 1 },
    { "source": "Cravatte", "target": "Myriel", "value": 1 },
    { "source": "Count", "target": "Myriel", "value": 2 },
    { "source": "OldMan", "target": "Myriel", "value": 1 },
    { "source": "Valjean", "target": "Labarre", "value": 1 },
    { "source": "Valjean", "target": "Mme.Magloire", "value": 3 },
    { "source": "Valjean", "target": "Mlle.Baptistine", "value": 3 }];

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function (d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(200, 400));


simulation
    .nodes(nodes);

simulation.force("link")
    .links(links);

console.log(nodes);
console.log(links);