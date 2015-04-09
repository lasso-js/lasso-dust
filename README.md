lasso-dust
===============

Plugin for the [Lasso.js](https://github.com/lasso-js/lasso) to support compilation and transport of [Dust](http://www.dustjs.com/) template files. Templates are compiled using the [dustc-commonjs](https://github.com/patrick-steele-idem/dustc-commonjs) compiler that produces a CommonJS module as output.

# Usage

```bash
npm install lasso-dust --save
npm install view-engine --save
npm install view-engine-dust --save
```

Register the plugin when configuring the lasso. For example:

```js
require('lasso').configure({
    "plugins": [
        ...
        "lasso-dust"
    ]
    ...
});
```

Required Dust templates will automatically be found via static code analysis as long as they are loaded using `require.resolve(path)` and rendered using code similar to the following (inside a CommonJS module):

```javascript
require('view-engine').register('dust', require('view-engine-dust'));

// ...

// Template must be loaded using require.resolve!
var template = require('view-engine').load(require.resolve('./template.dust'));

template.render({
        name: 'Frank'
    },
    function(err, output) {
        console.log(output);
    });
```

To explicitly declare templates that may not be discovered via static code analysis of CommonJS modules, you can also choose to declare a Dust template dependency in an `browser.json` file.

```json
{
    "dependencies": [
        "template.dust"
    ]
}
```

_NOTE: No configuration is supported by this module._

# Contributors

* [Patrick Steele-Idem](https://github.com/patrick-steele-idem) (Twitter: [@psteeleidem](http://twitter.com/psteeleidem))

# Contribute

Pull Requests welcome. Please submit Github issues for any feature enhancements, bugs or documentation problems.

# License

Apache License v2.0
