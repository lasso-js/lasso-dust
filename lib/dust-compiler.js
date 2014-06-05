var dust = require('dustjs-linkedin');
var fs = require('fs');
var nameRegExp = /['"]%TEMPLATE%['"]/g;

exports.compile = function(src, callback) {
    try {
        var compiledSrc = dust.compile(src, '%TEMPLATE%');
        compiledSrc = 'var dust=require("dustjs-linkedin");\n' + compiledSrc.replace(nameRegExp, '__filename') + '\nmodule.exports=dust.cache[__filename];';
        callback(null, compiledSrc);    
    } catch(e) {
        callback(e);
    }
    
};

exports.compileFile = function(path, callback) {
    
    fs.readFile(path, 'utf8', function(err, src) {
        if (err) {
            return callback(err);
        }

        exports.compile(src, callback);
        
    });
};