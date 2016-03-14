'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = function (files, deps) {
  var options = arguments.length <= 2 || arguments[2] === void 0 ? {} : arguments[2];
  var requires = arguments.length <= 3 || arguments[3] === void 0 ? {} : arguments[3];

  _extends(_grayMatter2['default'].parsers.requires, requires);

  return files.map(function (f) {
    var m = (0, _grayMatter2['default'])(f.content, options);

    return _extends({}, f, {

      metadata: _extends({}, f.metadata, m.data),
      content: m.content
    });
  });
};

var _grayMatter = require('gray-matter');

var _grayMatter2 = _interopRequireDefault(_grayMatter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }