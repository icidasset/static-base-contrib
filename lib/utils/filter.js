'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports['default'] = function (fn, condition) {
  return function (files, deps) {
    return new Promise(function (resolve) {

      var yes = [];
      var no = [];

      files.forEach(function (file) {
        if (condition(file)) yes.push(file);else no.push(file);
      });

      Promise.resolve(fn(yes, deps)).then(function (processed) {
        resolve((0, _sortBy2['default'])('path', [].concat(_toConsumableArray(processed), no)));
      });
    });
  };
};

var _sortBy = require('lodash/fp/sortBy');

var _sortBy2 = _interopRequireDefault(_sortBy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }