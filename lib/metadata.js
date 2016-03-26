'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports['default'] = function (files, deps, obj) {
  var options = arguments.length <= 3 || arguments[3] === void 0 ? {} : arguments[3];

  return files.map(function (f) {
    return (0, _store2['default'])(f, obj, options.path);
  });
};

var _store = require('./utils/store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }