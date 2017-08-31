import * as d3 from 'd3';
import * as topojson from 'topojson';
import * as Rx from 'rxjs';
import {
    csvParseRows,
    csvParse
} from 'd3-dsv';
import chartFactory from '../../common/index';


var dataSet = {
    startAngle: 0,
    endAngle: Math.PI * 0.75
};
//创建一个arc generator
var arcPath = d3.arc()
    .innerRadius(50)
    .outerRadius(100);
var arcSet=arcPath(dataSet);
console.log(arcSet);
