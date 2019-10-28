


const fs = require('fs'),
	path = require('path'),
	sassJsLoader = require('../lib/loader').default;
const inputFile = path.resolve(__dirname, './test.scss'),
	outputFile = path.resolve(__dirname, './out.scss');
var source = fs.readFileSync(inputFile, 'utf-8');
var resource = sassJsLoader(source);
		
fs.writeFileSync(outputFile, resource);
console.log('Done');
