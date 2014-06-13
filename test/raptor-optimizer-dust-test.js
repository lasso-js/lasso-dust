'use strict';
var chai = require('chai');
chai.Assertion.includeStack = true;
require('chai').should();
var expect = require('chai').expect;


describe('raptor-optimizer-dust' , function() {

    beforeEach(function(done) {
        // for (var k in require.cache) {
        //     if (require.cache.hasOwnProperty(k)) {
        //         delete require.cache[k];
        //     }
        // }

        done();
    });

    // it('should correctly compile a Dust template to a CommonJS module', function(done) {
    //     var compiler = require('../lib/dust-compiler');
    //     var templatePath = require.resolve('./template.dust');
    //     compiler.compileFile(templatePath, function(err, compiledSrc) {
    //         if (err) {
    //             done(err);
    //             return;
    //         }

    //         console.log('compiledSrc:\n' + compiledSrc);
    //         done();
    //     });
    // });

});