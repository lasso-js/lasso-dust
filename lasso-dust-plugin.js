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
                    const missingPathErr = new Error('"path" is required for a Dust dependency');

                    if (callback) {
                        return callback(missingPathErr);
                    } else {
                        throw missingPathErr;
                    }
                }

                this.path = this.resolvePath(this.path);
                if (callback) callback();
            },

            read: function(lassoContext, callback) {
                return compiler.compileFile(this.path, callback);
            },

            getSourceFile: function() {
                return this.path;
            },

            getLastModified: function(lassoContext, callback) {
                return lassoContext.getFileLastModified(this.path, callback);
            }
        });
};
