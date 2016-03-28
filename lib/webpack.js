'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports['default'] = function (files, config) {
  return new Promise(function (resolve, reject) {
    var compiler = (0, _webpack2['default'])(config);

    compiler.outputFileSystem = new _memoryFs2['default']();
    compiler.run(function (err, stats) {
      if (err) return reject(err);

      var fs = compiler.outputFileSystem;
      var info = stats.toString();

      if (stats.hasErrors()) return reject(info);

      var d = {
        wd: (0, _path.relative)(config.context, config.output.path),
        root: config.context
      };

      scan(fs, '', d).then(function (webpackFiles) {
        var flattened = (0, _flatten2['default'])(webpackFiles);
        resolve([].concat(_toConsumableArray(files), _toConsumableArray(flattened)));
      }, reject);
    });
  });
};

var _path = require('path');

var _dictionary = require('static-base/lib/dictionary');

var _flatten = require('lodash/fp/flatten');

var _flatten2 = _interopRequireDefault(_flatten);

var _memoryFs = require('memory-fs');

var _memoryFs2 = _interopRequireDefault(_memoryFs);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Execute a Webpack configuration,
 * and make a {@link Dictionary}.
 * @param {Dictionary} files
 * @param {Dependencies} deps
 * @param {Object} config - Webpack config object
 */


function scan(fs, combinedPath, deps) {
  var entirePath = (0, _path.join)(deps.root, deps.wd, combinedPath);

  return new Promise(function (resolve, reject) {
    fs.readdir(entirePath, function (err, files) {
      if (err) reject(err);

      Promise.all(files.map(function (name) {
        var p = (0, _path.join)(combinedPath, name);
        var e = (0, _path.join)(entirePath, name);
        return scanFile(name, p, e, deps);
      })).then(resolve, reject);
    });
  });
}

function scanFile(name, p, e, deps) {
  return new Promise(function (resolve, reject) {
    fs.stat(e, function (err, stats) {
      if (err) reject(err);

      if (stats.isDirectory()) {
        return resolve(scan(fs, p, deps));
      }

      var def = (0, _dictionary.buildDefinition)(p, deps);

      fs.readFile(def.entirePath, { encoding: 'utf-8' }, function (err, content) {
        if (err) reject(err);
        def.content = content;
        resolve(def);
      });
    });
  });
}