var dustPath;
var dust;

try {
    dustPath = require.resolve('dustjs-linkedin');
} catch(e) {
    dustPath = null;
}

if (dustPath) {
    dust = require('dustjs-linkedin');
}

var fs = require('fs');
var nameRegExp = /['"]%TEMPLATE%['"]/g;

exports.compile = function(src, callback) {
    if (!dust) {
        throw new Error('Unable to compile Dust template. The "dustjs-linkedin" module was not found. This module should be installed as a top-level application module');
    }

    try {
        var compiledSrc = dust.compile(src, '%TEMPLATE%');
        compiledSrc = 'var dust=require("dustjs-linkedin");\n' + compiledSrc.replace(nameRegExp, '__filename') + '\nmodule.exports=dust.cache[__filename];';
        callback(null, compiledSrc);    
    } catch(e) {
        callback(e);
    }
    
};

exports.compileFile = function(path, callback) {
    if (!dust) {
        throw new Error('Unable to compile Dust template at path "' + path + '". The "dustjs-linkedin" module was not found. This module should be installed as a top-level application module');
    }
    fs.readFile(path, 'utf8', function(err, src) {
        if (err) {
            return callback(err);
        }

        exports.compile(src, callback);
        
    });
};