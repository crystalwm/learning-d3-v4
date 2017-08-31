import * as d3 from 'd3';
import * as topojson from 'topojson';
import * as Rx from 'rxjs';
import {
  csvParseRows,
  csvParse
} from 'd3-dsv';
import chartFactory from '../../common/index';


var dataset = [
  ["小米", 60.8],
  ["三星", 58.4],
  ["联想", 47.3]
];

var pie = d3.pie()
  .value(function (d) {
    return d[1];
  });

//dataSet为原始数据，piedata为转换后的数据
var pieData=pie(dataset);

console.log(pieData);
