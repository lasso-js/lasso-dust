var compiler = require('dustc-commonjs');

module.exports = function(optimizer, config) {
    optimizer.dependencies.registerRequireType(
        'dust',
        {
            properties: {
                'path': 'string'
            },

            init: function(optimizerContext, callback) {
                if (!this.path) {
                    return callback(new Error('"path" is required for a Dust dependency'));
                }

                this.path = this.resolvePath(this.path);
                callback();
            },

            read: function(optimizerContext, callback) {
                compiler.compileFile(this.path, callback);
            },

            getSourceFile: function() {
                return this.path;
            },

            getLastModified: function(optimizerContext, callback) {
                optimizerContext.getFileLastModified(this.path, callback);
            }
        });
};
