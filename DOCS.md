# copy

Copy every `Definition` to a destination directory

**Parameters**

-   `files` **Dictionary** 
-   `destination` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 

# metadata

Add data to every `Definition`.

**Parameters**

-   `files` **Dictionary** 
-   `data` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
-   `options` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)=** 
    -   `options.path` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 

# parentPath

Add parentPath to every `Definition`.

**Parameters**

-   `files` **Dictionary** 

# pathToRoot

Add pathToRoot to every `Definition`.
For example, the pathToRoot value will be `../` for a definition with dirname `example`.

**Parameters**

-   `files` **Dictionary** 
-   `additionalLevels` **int=**  (optional, default `0`)

# permalinks

Convert the path of every `Definition` to the format `dirname/index.extname`.

**Parameters**

-   `files` **Dictionary** 

# read

Read the content of every `Definition` (aka file).

**Parameters**

-   `files` **Dictionary** 

# renameExt

Change the extension/extname of every `Definition`.

**Parameters**

-   `files` **Dictionary** 
-   `replaceWith` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The next extension (e.g. `.html`)

# Renderer

**Parameters**

-   `template` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `data` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** template context

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Returns a promise for a rendered template

# templates

Render templates and/or layouts.

**Parameters**

-   `files` **Dictionary** 
-   `renderer` **Renderer** 
-   `options` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)=** 
    -   `options.layout` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 
    -   `options.onlyApplyLayout` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 

# webpack

Execute a Webpack configuration,
and make a `Dictionary`.

**Parameters**

-   `files` **Dictionary** 
-   `config` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Webpack config object

# write

Write the content of every `Definition` (aka file) to disk.

**Parameters**

-   `files` **Dictionary** 
-   `destination` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 
