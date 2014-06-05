var compiler = require('./dust-compiler');

module.exports = function(optimizer, config) {
    optimizer.dependencies.registerPackageType('dust', require('./dependency-dust'));
    optimizer.dependencies.registerRequireExtension('dust', function(path, context, callback) {
        compiler.compileFile(path, callback);
    });
};