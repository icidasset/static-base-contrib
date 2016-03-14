'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (files, deps) {
  var additionalLevels = arguments.length <= 2 || arguments[2] === void 0 ? 0 : arguments[2];

  return files.map(function (f) {
    var d = f.dirname;
    var s = d.length ? d.split('/').map(function () {
      return '..';
    }) : [];

    for (var i = 0; i < additionalLevels; ++i) {
      s.push('..');
    }

    return _extends({}, f, {

      pathToRoot: s.length ? s.join('/') + '/' : ''
    });
  });
};