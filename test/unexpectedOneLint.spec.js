var expect = require('unexpected')
    .clone()
    .use(require('./unexpectedOneLint'));

describe('unexpectedOneLint Assertions', function () {
    describe('<LintResultMessages> to have messages satisfying <array>', function () {
        var result = {
            results: [
                {
                    filePath: "<text>",
                    messages: [
                        {
                            ruleId:"semi",
                            severity:2,
                            message:"Missing semicolon.",
                            line:1,
                            column:16,
                            nodeType:"VariableDeclaration",
                            source: "var foo = 'bar'",
                            fix: {
                                "range": [15, 15],
                                "text": ";"
                            }
                        }
                    ],
                    errorCount: 1,
                    warningCount: 0
                }
            ],
            "errorCount":1,
            "warningCount":0
        };
        result.results._isLintResultMessages = true;
        it('should not error', function () {
            var promise = expect.promise(function () {
                return expect(result.results, 'to have messages satisfying', [ /semicolon/ ]);
            })
            return expect(promise, 'to be fulfilled');
        });
        it('should error', function () {
            return expect(expect.promise(function () {
                return expect(result.results, 'to have messages satisfying', [ 'Lacking semicolon.' ]);
            }), 'to be rejected').then(function (err) {
                return expect(err, 'to have message',
                    "expected LintResultMessages([ 'Missing semicolon.' ]) to have messages satisfying [ 'Lacking semicolon.' ]\n" +
                    "\n"+
                    "[\n" +
                    "  'Missing semicolon.' // should equal 'Lacking semicolon.'\n" +
                    "                       // -Missing semicolon.\n" +
                    "                       // +Lacking semicolon.\n" +
                    "]"
                );
            });
        })
    });
    describe('<string> to lint without errors', function () {
        it('should not error', function () {
            return expect(expect.promise(function () {
                return expect("var foo = 'bar';", 'to lint without errors');
            }), 'to be fulfilled');
        });
        it('should error', function () {
            return expect(expect.promise(function () {
                return expect("var foo = 'bar'", 'to lint without errors');
            }), 'to be rejected').then(function (err) {
                return expect(err, 'to have message',
                    "expected 'var foo = \\'bar\\'' to lint without errors\n" +
                    '\n' +
                    '[\n' +
                    "  'Missing semicolon.' // should be removed\n" +
                    ']'
                );
            });
        });
    });
    describe('<string> to lint with (error|errors)', function () {
        it('single error', function () {
            return expect(expect.promise(function () {
                return expect("var foo = 'bar'", 'to lint with error');
            }), 'to be fulfilled');
        });
    });
    describe('<array> to equal (should inspect as in core)', function () {
        it('[ \'foo\' ] to equal []', function () {
            return expect(expect.promise(function () {
                return expect([ 'foo' ], 'to equal', [])
            }), 'to be rejected').then(function (err) {
                return expect(err, 'to have message',
                    "expected [ 'foo' ] to equal []\n" +
                    '\n' +
                    '[\n' +
                    "  'foo' // should be removed\n" +
                    ']'
                );
            });
        });
        it('[] to equal [ \'foo\' ]', function () {
            return expect(expect.promise(function () {
                return expect([], 'to equal', [ 'foo' ])
            }), 'to be rejected').then(function (err) {
                return expect(err, 'to have message',
                    "expected [] to equal [ 'foo' ]\n" +
                    '\n' +
                    '[\n' +
                    "  // missing 'foo'\n" +
                    ']'
                );
            });
        });
    });
});
