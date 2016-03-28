import fs from 'fs';
import Mustache from 'mustache';
import test from 'ava';

import { join } from 'path';
import { run } from 'static-base';

import { copy, metadata, parentPath, pathToRoot } from './lib';
import { permalinks, read, renameExt, templates } from './lib';
import { webpack, write } from './lib';


const root = process.cwd();


test('copy', async t => {
  return run(
    [copy, 'build/copy']
  )(
    'test/fixtures/example.md',
    root
  ).then(
    () => t.is(fsread('build/copy/example.md'), '# Example\n'),
    handleError(t)
  )
});


test('metadata', async t => {
  return run(
    [inject()],
    [metadata, { test: true }]
  )().then(
    (files) => t.is(files[0].test, true),
    handleError(t)
  );
});


test('parent-path - 1', async t => {
  return run(
    [inject({ dirname: 'test' })],
    [parentPath]
  )().then(
    (files) => t.is(files[0].parentPath, '../'),
    handleError(t)
  );
});


test('parent-path - 2', async t => {
  return run(
    [inject({ dirname: '' })],
    [parentPath]
  )().then(
    (files) => t.is(files[0].parentPath, undefined),
    handleError(t)
  );
});


test('path-to-root', async t => {
  return run(
    [inject({ dirname: 'test/yo' })],
    [pathToRoot]
  )().then(
    (files) => t.is(files[0].pathToRoot, '../../'),
    handleError(t)
  );
});


test('permalinks', async t => {
  return run(
    [permalinks]
  )(
    'test/fixtures/template.mu',
    root
  ).then(
    (files) => t.is(files[0].path, 'template/index.mu'),
    handleError(t)
  );
});


test('read', async t => {
  return run(
    [read]
  )(
    'test/fixtures/example.md',
    root
  ).then(
    (files) => t.is(files[0].content, '# Example\n'),
    handleError(t)
  );
});


test('rename-ext', async t => {
  return run(
    [renameExt, '.html']
  )(
    'test/fixtures/example.md',
    root
  ).then(
    (files) => t.is(files[0].extname, '.html'),
    handleError(t)
  );
});


test('templates', async t => {
  return run(
    [read],
    [metadata, { layout: 'test/fixtures/layout.mu' }],
    [templates, renderer]
  )(
    'test/fixtures/template.mu',
    root
  ).then(
    (files) => {
      const f = files[0];

      t.regex(f.content, /DOCTYPE/);
      t.regex(f.content, /<h1>/);
    },
    handleError(t)
  );
});


test.todo('webpack');


test('write', async t => {
  return run(
    [read],
    [write, 'build']
  )(
    'test/fixtures/example.md',
    root
  ).then(
    (files) => {
      const f = files[0];

      return new Promise((resolve, reject) => {
        fs.readFile(f.entirePath, { encoding: 'utf-8' }, (err, content) => {
          if (err) return reject(err);
          t.is(content, '# Example\n')
          resolve();
        });
      });
    },
    handleError(t)
  );
});


/*

  Utilities

*/


function fsread(partialPath) {
  return fs.readFileSync(join(root, partialPath), 'utf-8');
}


function inject(data = {}) {
  return () => [data];
}


function renderer(template, data) {
  return Promise.resolve(Mustache.render(template, data));
}


function handleError(t) {
  return (err) => t.fail(err.toString());
}
