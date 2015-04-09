'use strict';
var chai = require('chai');
chai.config.includeStack = true;
var expect = require('chai').expect;
var nodePath = require('path');
var fs = require('fs');

var dustPlugin = require('../'); // Load this module just to make sure it works
var lasso = require('lasso');

describe('lasso-dust' , function() {


    it('should compile a simple Dust template', function(done) {
        var myLasso = lasso.create({
                fileWriter: {
                    fingerprintsEnabled: false,
                    outputDir: nodePath.join(__dirname, 'static')
                },
                bundlingEnabled: true,
                plugins: [
                    {
                        plugin: 'lasso-require',
                        config: {
                            includeClient: false
                        }
                    },
                    {
                        plugin: dustPlugin,
                        config: {

                        }
                    }
                ]
            });

        myLasso.optimizePage({
                name: 'testPage',
                dependencies: [
                    nodePath.join(__dirname, 'fixtures/simple.dust')
                ]
            },
            function(err, optimizedPage) {
                if (err) {
                    return done(err);
                }

                var output = fs.readFileSync(nodePath.join(__dirname, 'static/testPage.js'), 'utf8');
                expect(output).to.contain('module.exports');
                expect(output).to.contain('"/test/fixtures/simple.dust"');
                done();
            });
    });

});
