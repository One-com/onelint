var expect = require('unexpected')
    .clone()
    .use(require('./unexpectedOneLint'));

describe('onelint', function () {
    it('should error on missing semicolons', function () {
        var code = "var foo = 'bar'";
        return expect(code, 'to lint with error').then(function (result) {
            return expect(result, 'to have messages satisfying', [
                'Missing semicolon.'
            ]);
        });
    });
});
