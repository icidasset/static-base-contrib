'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = function (files, deps, renderer) {
  var promises = files.map(function (f) {
    var data = templateData(f);
    var initial = renderer(f.content, data);

    // apply layouts (in order)
    var layouts = f.metadata.layouts || (f.metadata.layout ? [f.metadata.layout] : []);

    layouts = layouts.map(function (l) {
      return function (html) {
        var path = (0, _path.join)(f.root, l);
        var layout = _fs2['default'].readFileSync(path, 'utf-8');

        return renderer(layout, _extends({}, data, { content: html }));
      };
    });

    // return promise
    return layouts.reduce(function (promise, fn) {
      return promise.then(fn);
    }, initial).then(function (html) {
      return _extends({}, f, {
        content: html
      });
    });
  });

  // return
  return Promise.all(promises);
};

var _path = require('path');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function templateData(f) {
  return _extends({}, f, {
    metadata: void 0
  }, f.metadata);
}