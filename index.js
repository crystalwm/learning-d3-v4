var fs = require('fs');

var a = fs.readFileSync('./crl-set', {
    encoding: 'ascii'
});

var bytes = new Buffer(a, "ascii");

fs.writeFileSync('./a.txt', bytes, {
    encoding: 'ascii'
});