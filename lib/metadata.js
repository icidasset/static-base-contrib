'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports['default'] = function (files, obj) {
  var options = arguments.length <= 2 || arguments[2] === void 0 ? {} : arguments[2];

  return files.map(function (f) {
    return (0, _store2['default'])(f, obj, options.path);
  });
};

var _store = require('./utils/store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }