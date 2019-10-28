const fs = require('fs'),
	path = require('path');
import analyzeModule from './utils/analyzeModule';
import analyzeCode from './utils/analyzeCode';
import variateConvert from './utils/variateConvert';
export default function (source) {
	const webpack = this || {};
	const callback = webpack.async && webpack.async() || undefined;
	const webpackConfigContext = webpack.rootContext || process.cwd() || __dirname;
	const modules = analyzeModule(source);
	modules.map(module=>{
		const filePath = path.resolve(webpackConfigContext, module.path);
		webpack.addDependency && webpack.addDependency(filePath);
		let code = null;
		try {
			code = fs.readFileSync(filePath, 'utf-8');
		}
		catch(err) {
			if(err.code=='ENOENT') {
				const error = new Error(`Can't find ${module.path}. Make sure sass-js file exists`);
				console.error(error);
			}
		}
		if(!code) return false;
		let data = analyzeCode(code);
		module.data = data;
		const sassVars = variateConvert(module);
		source = source.replace(module.string, sassVars);
	});
	if(!callback) return source;
	callback(source);
}


