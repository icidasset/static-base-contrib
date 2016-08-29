'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = forkDefinition;

var _staticBase = require('static-base');

/**
 * Build a {@link Definition} based on another {@link Definition}.
 * Does not transfer additional properties.
 * @param {string} path - The path for the new {@link Definition}
 * @param {Definition} def - Existing {@link Definition}
 */
function forkDefinition(path, def) {
  return (0, _staticBase.buildDefinition)(path, (0, _staticBase.buildDependencies)(def.wd, def.root));
}