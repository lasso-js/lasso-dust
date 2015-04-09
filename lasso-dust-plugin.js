var compiler = require('dustc-commonjs');

module.exports = function(lasso, config) {
    lasso.dependencies.registerRequireType(
        'dust',
        {
            properties: {
                'path': 'string'
            },

            init: function(lassoContext, callback) {
                if (!this.path) {
                    return callback(new Error('"path" is required for a Dust dependency'));
                }

                this.path = this.resolvePath(this.path);
                callback();
            },

            read: function(lassoContext, callback) {
                compiler.compileFile(this.path, callback);
            },

            getSourceFile: function() {
                return this.path;
            },

            getLastModified: function(lassoContext, callback) {
                lassoContext.getFileLastModified(this.path, callback);
            }
        });
};
