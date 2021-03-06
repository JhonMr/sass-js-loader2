"use strict";

var esprima = require('esprima');

function analyze(source) {
  var ast = esprima.parse(source);
  var astBody = ast.body;
  var global = {};

  for (var i = 0; i < astBody.length; i++) {
    var item = astBody[i]; // 变量定义

    if (item.type === 'VariableDeclaration') {
      item.declarations.map(function (variate) {
        global[variate.id.name] = undefined; // 变量类型

        switch (variate.init.type) {
          // 常量
          case "Literal":
            global[variate.id.name] = variate.init.value;
            break;
          // 数组

          case "ArrayExpression":
            global[variate.id.name] = toArray(variate.init.elements);
            break;
          // 对象	

          case "ObjectExpression":
            global[variate.id.name] = toObject(variate.init.properties);
            break;

          default:
            global[variate.id.name] = '特殊类型：' + variate.init.type;
        }
      });
    } // 赋值


    if (item.type === 'ExpressionStatement') {
      var left = item.expression.left;
      var right = item.expression.right;
      if (left.object) global[left.object.name] = global[left.object.name] || {};

      if (left.property) {
        // 文字的
        if (right.type === 'Literal') {
          global[left.object.name][left.property.name] = right.value;
        } // 变量


        if (right.type === 'Identifier') {
          global[left.object.name][left.property.name] = global[right.name];
        } // 表达式（计算）


        if (right.type === 'BinaryExpression') {
          global[left.object.name][left.property.name] = compute(right.left.value, right.right.value, right.operator);
        }
      }
    }
  }

  return global;
}

function compute(a, b, operator) {
  return eval(a + operator + b);
}

function toArray(elements) {
  var array = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  elements.map(function (item) {
    switch (item.type) {
      case 'Literal':
        array.push(item.value);
        break;

      case 'ArrayExpression':
        array.push(toArray(item.init.elements));
        break;

      case "ObjectExpression":
        array.push(toObject(item.init.properties));
        break;
    }
  });
  return array;
}

function toObject(properties) {
  var object = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  properties.map(function (item) {
    var key = item.key.name;
    var value = item.value;

    switch (value.type) {
      case 'Literal':
        object[key] = value.value;
        break;

      case 'ArrayExpression':
        object[key] = toArray(value.init.elements);
        break;

      case "ObjectExpression":
        object[key] = toObject(value.init.properties);
        break;
    }
  });
  return object;
}

module.exports = analyze;