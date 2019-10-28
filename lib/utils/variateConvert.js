"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

function arrayConvert(array) {
  var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '(';
  array.map(function (item, index) {
    if (index) str += ',';

    if (item instanceof Array) {
      str += arrayConvert(item);
    } else if (item instanceof Object) {
      str += objectConvert(item);
    } else str += item;
  });
  str += ')';
  return str;
}

function objectConvert(object) {
  var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '(';

  for (var k in object) {
    var item = object[k];

    if (item instanceof Array) {
      str += "".concat(k, ": ").concat(arrayConvert(item));
    } else if (item instanceof Object) {
      str += "".concat(k, ": ").concat(objectConvert(item));
    } else str += item;

    str += ',';
  }

  str += ')';
  return str;
}

function _default(module) {
  console.log(module);
  var data = module.data,
      convert = '';

  if (module.assignment == 'default') {
    if (data instanceof Array) {
      convert = "".concat(module.variate, ": ").concat(arrayConvert(data));
    } else if (data instanceof Object) {
      convert = "".concat(module.variate, ": ").concat(objectConvert(data));
    } else convert = "".concat(module.variate, ": ").concat(data);
  }

  if (module.assignment == 'part') {
    var variate = module.variate;
    variate.map(function (v) {
      var key = v.slice(1);
      var value = data.exports[key];
      convert += "".concat(v, ": ").concat(value, ";");
    });
  }

  return convert;
}