'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = templates;

var _path = require('path');

var _get = require('lodash/fp/get');

var _get2 = _interopRequireDefault(_get);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * @typedef Renderer
 * @name Renderer
 * @param {string} template
 * @param {Object} data - template context
 * @return {Promise} Returns a promise for a rendered template
 */

/**
 * Render templates and/or layouts.
 * @param {Dictionary} files
 * @param {Renderer} renderer
 * @param {Object} [options]
 * @param {string} options.layout
 * @param {string} options.onlyApplyLayout
 */
function templates(files, renderer) {
  var options = arguments.length <= 2 || arguments[2] === void 0 ? {} : arguments[2];

  var safeRenderer = function safeRenderer() {
    var template = arguments.length <= 0 || arguments[0] === void 0 ? '' : arguments[0];
    var data = arguments.length <= 1 || arguments[1] === void 0 ? {} : arguments[1];

    return Promise.resolve(renderer(template, data));
  };

  var promises = files.map(function (f) {
    var data = _extends({}, f);
    var initial = options.onlyApplyLayout ? Promise.resolve(f.content) : safeRenderer(f.content, data);

    // apply layouts (in order)
    var layouts = options.layouts || options.layout || data.layouts || data.layout;

    if (Array.isArray(layouts) === false) {
      layouts = [layouts];
    }

    layouts = layouts.map(function (l) {
      return function (html) {
        var path = (0, _path.join)(f.root, l);

        return new Promise(function (resolve, reject) {
          _fs2['default'].readFile(path, { encoding: 'utf-8' }, function (err, layout) {
            if (err) reject(err);else safeRenderer(layout, _extends({}, data, { content: html })).then(resolve);
          });
        });
      };
    });

    // return promise
    return layouts.reduce(function (promise, fn) {
      return promise.then(fn);
    }, initial).then(function (html) {
      return _extends({}, f, { content: html });
    });
  });

  // return
  return Promise.all(promises);
}