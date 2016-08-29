'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = store;

var _update = require('lodash/fp/update');

var _update2 = _interopRequireDefault(_update);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Clone source object and then copy in another object at a certain path or root.
 * @param {Object} src - Source object
 * @param {Object} obj - Another object
 * @param {string} [path] - Path in the source object
 */
function store(src, obj, path) {
  var n = void 0;

  if (path) {
    n = _extends({}, src);
    (0, _update2['default'])(function (x) {
      return x ? _extends({}, x, obj) : _extends({}, obj);
    }, path, n);
  } else {
    n = _extends({}, src, obj);
  }

  return n;
}