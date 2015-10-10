var expect = require('unexpected')
    .clone()
    .use(require('./unexpectedOneLint'));
var onelint = require('../');

describe('onelint', function () {
    before(function (done) {
        // Don't punish the first text for the upstart time of onelint
        onelint.lintText(';', done);
    });
    it('should error on missing semicolons', function () {
        var code = "var foo = 'bar'";
        return expect(code, 'to lint with error').then(function (result) {
            return expect(result, 'to have message satisfying', 'Missing semicolon.');
        });
    });
    it('should error on multiple missing semicolons', function () {
        var code = "var foo = 'bar'\nvar bar = foo";
        return expect(code, 'to lint with error').then(function (result) {
            return expect(result, 'to have messages satisfying', [
                'Missing semicolon.',
                'Missing semicolon.'
            ]);
        });
    });
});
