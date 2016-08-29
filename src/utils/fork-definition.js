import { buildDefinition, buildDependencies } from 'static-base';


/**
 * Build a {@link Definition} based on another {@link Definition}.
 * Does not transfer additional properties.
 * @param {string} path - The path for the new {@link Definition}
 * @param {Definition} def - Existing {@link Definition}
 */
export default function forkDefinition(path, def) {
  return buildDefinition(path, buildDependencies(def.wd, def.root));
}
