'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports['default'] = function (files, destination) {
  var promises = files.map(function (f) {
    return new Promise(function (resolve, reject) {
      _fsExtra2['default'].copy(f.entirePath, (0, _path.join)(f.root, destination, f.path), function (err) {
        return err ? reject(err) : resolve(f);
      });
    });
  });

  return Promise.all(promises);
};

var _path = require('path');

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }