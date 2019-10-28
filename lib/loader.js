"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _analyzeModule = _interopRequireDefault(require("./utils/analyzeModule"));

var _analyzeCode = _interopRequireDefault(require("./utils/analyzeCode"));

var _variateConvert = _interopRequireDefault(require("./utils/variateConvert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var fs = require('fs'),
    path = require('path');

function _default(source) {
  var webpack = this || {};
  var callback = webpack.async && webpack.async() || undefined;

  var webpackConfigContext = webpack.rootContext || process.cwd() || __dirname;

  var modules = (0, _analyzeModule["default"])(source);
  modules.map(function (module) {
    var filePath = path.resolve(webpackConfigContext, module.path);
    webpack.addDependency && webpack.addDependency(filePath);
    var code = null;

    try {
      code = fs.readFileSync(filePath, 'utf-8');
    } catch (err) {
      if (err.code == 'ENOENT') {
        var error = new Error("Can't find ".concat(module.path, ". Make sure sass-js file exists"));
        console.error(error);
      }
    }

    if (!code) return false;
    var data = (0, _analyzeCode["default"])(code);
    module.data = data;
    var sassVars = (0, _variateConvert["default"])(module);
    source = source.replace(module.string, sassVars);
  });
  if (!callback) return source;
  callback(source);
}