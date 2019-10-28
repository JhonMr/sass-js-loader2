"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var importReg = /(import\s+{([^}]+)}\s+from\s+("([^\s]+)"|'([^\s]+)'))|(import\s+(([^\s]+)\s+from\s+("([^\s]+)"|'([^\s]+)')))/gim;

function analyzeModule(source) {
  var modules = [];
  var regexpResult = null;

  do {
    regexpResult = importReg.exec(source);
    if (!regexpResult) continue;
    var module = void 0; // import {...} from "";

    if (regexpResult[1]) {
      var variate = regexpResult[2].replace(/\s/g, '').split(',');
      module = {
        string: regexpResult[0],
        path: regexpResult[4] || regexpResult[5],
        variate: variate,
        assignment: 'part'
      };
    } // import .. from "";


    if (regexpResult[6]) {
      module = {
        string: regexpResult[0],
        path: regexpResult[10] || regexpResult[11],
        variate: regexpResult[8],
        assignment: 'default'
      };
    } // import * as ... from "";
    // todo


    modules.push(module);
  } while (regexpResult);

  return modules;
}

var _default = analyzeModule;
exports["default"] = _default;