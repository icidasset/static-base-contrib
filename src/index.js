import copy from './copy';
import metadata from './metadata';
import parentPath from './parent-path';
import pathToRoot from './path-to-root';
import permalinks from './permalinks';
import read from './read';
import renameExtension from './rename-ext';
import templates from './templates';
import webpack from './webpack';
import write from './write';


/**
 * A dictionary item, a definition. (Copied from `static-base`).
 * @typedef {Object} Definition
 * @property {string} path        - e.g. `sub/example.ext`
 * @property {string} entirePath  - e.g. `/Users/icidasset/Projects/portfolio/src/templates/sub/example.ext`
 * @property {string} wd          - e.g. `src/templates`
 * @property {string} root        - e.g. `/Users/icidasset/Projects/portfolio`
 * @property {string} dirname     - e.g. `sub`
 * @property {string} basename    - e.g. `example`
 * @property {string} extname     - e.g. `.ext`
 * @property {string} pattern     - e.g. `** / *.ext` (without the spaces)
 */


/**
 * A dictionary. (Copied from `static-base`).
 * @typedef {Definition[]} Dictionary
 */


/**
 * A subset of a Definition, is used to initially build a Definition.
 * (Copied from `static-base`).
 * @typedef {Object} Dependencies
 * @property {string} pattern
 * @property {string} wd
 * @property {string} root
 */


export {
  copy,
  metadata,
  parentPath,
  pathToRoot,
  permalinks,
  read,
  renameExtension,
  templates,
  webpack,
  write,
};
