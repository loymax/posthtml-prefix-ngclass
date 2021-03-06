# posthtml-prefix-ngclass

[PostHTML](https://github.com/posthtml/posthtml) plugin to prefix ng-class names.

## Installation

```shell
npm install --save-dev posthtml-prefix-ngclass
```

## Demo

[https://loymax.github.io/posthtml-prefix-ngclass/](https://loymax.github.io/posthtml-prefix-ngclass/)

## Usage

```js
const posthtml = require('posthtml');
const posthtmlPrefixNgClass = require('posthtml-prefix-ngclass');

posthtml()
    .use(posthtmlPrefixNgClass({
        prefix: 'prefix-'
    }))
    .process(
        `<div ng-class="{ 'has-error': model.$invalid, 'row': vertical }"></div>`
    )
    .then((output) => {
        console.log(output.html);
        // <div ng-class="{'prefix-has-error': model.$invalid,'prefix-row': vertical}"></div>
    });
```

## Options

### `prefix`

Type: `String`
Default: `''`

The string used to prefix ng-class names.

### `ignore`

Type: `Array|String`
Default: `[]`

A class name, or an array of class names, to be excluded from prefixing.

```js
const posthtml = require('posthtml');
const posthtmlPrefixNgClass = require('posthtml-prefix-ngclass');

posthtml()
    .use(posthtmlPrefixNgClass({
        prefix: 'prefix-',
        ignore: ['row']
    }))
    .process(
        `<div ng-class="{ 'has-error': model.$invalid, 'row': vertical }"></div>`
    )
    .then((output) => {
        console.log(output.html);
        // <div ng-class="{'prefix-has-error': model.$invalid,'row': vertical}"></div>
    });
```

## Testing

```shell
npm test
```

## To-Do
Add support for condition/function in square brackets
