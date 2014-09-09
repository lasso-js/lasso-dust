var nodePath = require('path');
var compiler = require('dustc-commonjs');

function reader(path, context, callback) {
    compiler.compileFile(path, callback);
}

module.exports = {
    properties: {
        'path': 'string'
    },

    init: function() {
        if (!this.path) {
            throw new Error('"path" is required for a Dust dependency');
        }
        
        this.path = this.resolvePath(this.path);
    },
    
    getDependencies: function(optimizerContext, callback) {
        /*
        We use the require dependency type since we are compiling Dust templates
        to CommonJS modules and they need to be wrapped for transport to the browser.
         */
        callback(null, [
            {
                type: 'require',
                resolvedPath: this.path,
                reader: reader
            }
        ]);
    },

    getDir: function() {
        return nodePath.dirname(this.path);
    }
};