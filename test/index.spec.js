var expect = require('unexpected')
    .clone()
    .use(require('./unexpectedOneLint'));

describe('onelint', function () {
    it('should error on missing semicolons', function () {
        return expect(
            "var foo = 'bar'",
            'to lint with error'
        ).then(function (result) {
            return expect(result, 'to have message satisfying', 'Missing semicolon.');
        });
    });
    it('should error on multiple missing semicolons', function () {
        return expect(
            "var foo = 'bar'\n" +
            'var bar = foo',
            'to lint with error'
        ).then(function (result) {
            return expect(result, 'to have messages satisfying', [
                'Missing semicolon.',
                'Missing semicolon.'
            ]);
        });
    });
    describe('4 space indentation', function () {
        it('should pass a valid example', function () {
            return expect(
                'if (true) {\n' +
                '    foo = false;\n' +
                '}',
                'to lint without errors'
            );
        });
        it('should pass a valid example', function () {
            return expect(
                'if (true) {\n' +
                '   foo = false;\n' +
                '}',
                'to lint with errors'
            ).then(function (result) {
                return expect(result, 'to have messages satisfying', [
                    'Expected indentation of 4 space characters but found 3.'
                ]);
            });
        });
    });
});
