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
        You may be wondering why we return a set of dependencies instead of
        just providing a "read" method. By piggy backing off the "require"
        dependency type we can automatically have our compiled CommonJS module
        inspected for additional dependencies.
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