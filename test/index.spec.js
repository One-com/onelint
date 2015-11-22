var expect = require('unexpected')
    .clone()
    .use(require('./util/unexpectedOneLint'));

describe('onelint', function () {
    it('should error on missing semicolons', function () {
        return expect(
            "var foo = 'bar'",
            'to lint with error'
        ).then(function (result) {
            return expect(result, 'to only have messages violating rule', 'semi');
        });
    });
    it('should error on multiple missing semicolons', function () {
        return expect(
            "var foo = 'bar'\n" +
            'var bar = foo',
            'to lint with error'
        ).then(function (result) {
            return expect(result, 'to have violations satisfying', [
                { ruleId: 'semi' },
                { ruleId: 'semi' }
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
                return expect(result, 'to only have messages violating rule', 'indent');
            });
        });
    });
    describe('single quotes', function () {
        it('should not complain about single quotes', function () {
            return expect("var foo = 'bar';", 'to lint without errors');
        });
        it('should complain about double quotes', function () {
            return expect('var foo = "bar";', 'to lint with error').then(function (result) {
                return expect(result, 'to only have messages violating rule', 'quotes');
            });
        });
        it('should not complain about double quotes to avoid escaping', function () {
            return expect('var foo = "ba\'r";', 'to lint without errors');
        });
    });
    describe('tripple equals', function () {
        it('should not complain about tripple equals', function () {
            return expect('var foo = true === false;', 'to lint without errors');
        });
        it('should not complain about !==', function () {
            return expect('var foo = true !== false;', 'to lint without errors');
        });
        it('should complain about ==', function () {
            return expect('var foo = true == false;', 'to lint with errors').then(function (result) {
                return expect(result, 'to have violations satisfying', [
                    {
                        ruleId: 'eqeqeq',
                        message: /saw '==/
                    }
                ]);
            });
        });
        it('should complain about !=', function () {
            return expect('var foo = true != false;', 'to lint with errors').then(function (result) {
                return expect(result, 'to have violations satisfying', [
                    {
                        ruleId: 'eqeqeq',
                        message: /saw '!='/
                    }
                ]);
            });
        });
    });
    describe('ES6 modules', function () {
        describe('import', function () {
            it('simple import statement', function () {
                return expect("import 'bar';", 'to lint without errors');
            });
            it('complex import statement', function () {
                return expect("import foo from 'bar';", 'to lint without errors');
            });
        });
        describe('export', function () {
            it('simple export statement', function () {
                return expect('export function foo() {};', 'to lint without errors');
            });
            it('default export statement', function () {
                return expect('export default function foo() {};', 'to lint without errors');
            });
        });
    });
});
