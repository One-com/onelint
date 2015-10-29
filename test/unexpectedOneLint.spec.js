var expect = require('unexpected')
    .clone()
    .use(require('./unexpectedOneLint'));

describe('unexpectedOneLint Assertions', function () {
    describe('<LintMessage>', function () {
        var lintMessage = {
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
        };
        describe('to satisfy <string>', function () {
            it('should not error', function () {
                return expect(expect.promise(function () {
                    return expect(lintMessage, 'to satisfy', 'Missing semicolon.');
                }), 'to be fulfilled');
            });
            it('should error', function () {
                return expect(expect.promise(function () {
                    return expect(lintMessage, 'to satisfy', 'Missing Semicolon.');
                }), 'to be rejected').then(function (err) {
                    return expect(err, 'to have message',
                        "expected Line 1, column 16: Missing semicolon. (semi) to satisfy 'Missing Semicolon.'\n" +
                        '\n' +
                        '-Missing semicolon.\n' +
                        '+Missing Semicolon.'
                    );
                });
            });
        });
        describe('to satisfy <regexp>', function () {
            it('should not error', function () {
                return expect(expect.promise(function () {
                    return expect(lintMessage, 'to satisfy', /Missing semicolon/);
                }), 'to be fulfilled');
            });
            it('should error', function () {
                return expect(expect.promise(function () {
                    return expect(lintMessage, 'to satisfy', /Semicolon/);
                }), 'to be rejected').then(function (err) {
                    return expect(err, 'to have message',
                        'expected Line 1, column 16: Missing semicolon. (semi) to satisfy /Semicolon/'
                    );
                });
            });
        });
    });
    describe('<LintReport> to have messages satisfying <array>', function () {
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
        it('should not error', function () {
            var promise = expect.promise(function () {
                return expect(result, 'to have messages satisfying', [ /semicolon/ ]);
            });
            return expect(promise, 'to be fulfilled');
        });
        it('should error', function () {
            return expect(expect.promise(function () {
                return expect(result, 'to have messages satisfying', [ 'Lacking semicolon.' ]);
            }), 'to be rejected').then(function (err) {
                return expect(err, 'to have message',
                    'expected\n' +
                    'LintReport(\n' +
                    '  errorCount: 1,\n' +
                    '  warningCount: 0,\n' +
                    '  messages: [ Line 1, column 16: Missing semicolon. (semi) ]\n' +
                    ')\n' +
                    "to have messages satisfying [ 'Lacking semicolon.' ]\n" +
                    "\n"+
                    "[\n" +
                    "  Line 1, column 16: Missing semicolon. (semi) // should equal 'Lacking semicolon.'\n" +
                    '                                               // -Missing semicolon.\n' +
                    '                                               // +Lacking semicolon.\n' +
                    "]"
                );
            });
        });
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
                    "  Line 1, column 16: Missing semicolon. (semi) // should be removed\n" +
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
});
