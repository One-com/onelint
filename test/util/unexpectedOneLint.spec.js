var expect = require('unexpected')
    .clone()
    .use(require('./unexpectedOneLint'));

expect.output.preferredWidth = 100;

describe('unexpectedOneLint Assertions', function () {
    describe('<LintMessage>', function () {
        var lintMessage = {
            ruleId: 'semi',
            severity: 2,
            message: 'Missing semicolon.',
            line: 1,
            column: 16,
            nodeType: 'VariableDeclaration',
            source: "var foo = 'bar'",
            fix: {
                range: [15, 15],
                text: ';'
            }
        };
        describe('to violate rule <string>', function () {
            it('should not error', function () {
                return expect(expect.promise(function () {
                    return expect(lintMessage, 'to violate rule', 'semi');
                }), 'to be fulfilled');
            });
            it('should error', function () {
                return expect(expect.promise(function () {
                    return expect(lintMessage, 'to violate rule', 'eqeqeq');
                }), 'to be rejected').then(function (err) {
                    return expect(err, 'to have message',
                        "expected Line 1, column 16: Missing semicolon. (semi) to violate rule 'eqeqeq'\n" +
                        '\n' +
                        '-semi\n' +
                        '+eqeqeq'
                    );
                });
            });
        });
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
    describe('<LintReport>', function () {
        var result = {
            results: [
                {
                    filePath: '<text>',
                    messages: [
                        {
                            ruleId: 'semi',
                            severity:2,
                            message: 'Missing semicolon.',
                            line: 1,
                            column: 16,
                            nodeType: 'VariableDeclaration',
                            source: "var foo = 'bar'",
                            fix: {
                                range: [15, 15],
                                text: ';'
                            }
                        }
                    ],
                    errorCount: 1,
                    warningCount: 0
                }
            ],
            errorCount:1,
            warningCount:0
        };
        describe('to have messages satisfying <array>', function () {
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
                        '\n'+
                        '[\n' +
                        "  Line 1, column 16: Missing semicolon. (semi) // should equal 'Lacking semicolon.'\n" +
                        '                                               // -Missing semicolon.\n' +
                        '                                               // +Lacking semicolon.\n' +
                        ']'
                    );
                });
            });
        });
        describe('to have messages violating rule <string>', function () {
            it('should not error', function () {
                return expect(expect.promise(function () {
                    return expect(result, 'to only have messages violating rule', 'semi');
                }), 'to be fulfilled');
            });
            it('should error', function () {
                return expect(expect.promise(function () {
                    return expect(result, 'to only have messages violating rule', 'eqeqeq');
                }), 'to be rejected').then(function (err) {
                    return expect(err, 'to have message',
                        'expected\n' +
                        'LintReport(\n' +
                        '  errorCount: 1,\n' +
                        '  warningCount: 0,\n' +
                        '  messages: [ Line 1, column 16: Missing semicolon. (semi) ]\n' +
                        ')\n' +
                        "to only have messages violating rule 'eqeqeq'\n" +
                        '\n'+
                        '[\n' +
                        "  Line 1, column 16: Missing semicolon. (semi) // should violate rule 'eqeqeq'\n" +
                        '                                               //\n' +
                        '                                               // -semi\n' +
                        '                                               // +eqeqeq\n' +
                        ']'
                    );
                });
            });
        });
        describe('to have violations satisfying <array>', function () {
            var result = {
                results: [
                    {
                        filePath: '<text>',
                        messages: [
                            {
                                ruleId: 'eqeqeq',
                                severity: 2,
                                message: 'Expected \'===\' and instead saw \'==\'.',
                                line: 1,
                                column: 16,
                                nodeType: 'BinaryExpression',
                                source: 'var foo = true == false',
                                fix: { range: [ 17, 17 ], text: '=' }
                            },
                            {
                                ruleId: 'semi',
                                severity: 2,
                                message: 'Missing semicolon.',
                                line: 1,
                                column: 24,
                                nodeType: 'VariableDeclaration',
                                source: 'var foo = true == false',
                                fix: { range: [ 23, 23 ], text: ';' }
                            }
                        ],
                        errorCount: 2,
                        warningCount: 0
                    }
                ],
                errorCount: 2,
                warningCount: 0
            };

            it('should not error', function () {
                return expect(expect.promise(function () {
                    return expect(result, 'to have violations satisfying', [ { message: /Expected \'/, ruleId: 'eqeqeq' }, { ruleId: 'semi' } ]);
                }), 'to be fulfilled');
            });
            it('should error', function () {
                return expect(expect.promise(function () {
                    return expect(result, 'to have violations satisfying', [ { ruleId: 'semi' }, { ruleId: 'semi' } ]);
                }), 'to be rejected').then(function (err) {
                    return expect(err, 'to have message',
                        'expected\n' +
                        'LintReport(\n' +
                        '  errorCount: 2,\n' +
                        '  warningCount: 0,\n' +
                        '  messages: [\n' +
                        '              Line 1, column 16: Expected \'===\' and instead saw \'==\'. (eqeqeq),\n' +
                        '              Line 1, column 24: Missing semicolon. (semi)\n' +
                        '            ]\n' +
                        ')\n' +
                        "to have violations satisfying [ { ruleId: 'semi' }, { ruleId: 'semi' } ]\n" +
                        '\n'+
                        '[\n' +
                        '  {\n' +
                        "    ruleId: 'eqeqeq', // should equal 'semi'\n" +
                        '                      // -eqeqeq\n' +
                        '                      // +semi\n' +
                        '    severity: 2,\n' +
                        "    message: 'Expected \\'===\\' and instead saw \\'==\\'.',\n" +
                        '    line: 1,\n' +
                        '    column: 16,\n' +
                        "    nodeType: 'BinaryExpression',\n" +
                        "    source: 'var foo = true == false',\n" +
                        "    fix: { range: [ 17, 17 ], text: '=' }\n" +
                        '  },\n' +
                        '  Line 1, column 24: Missing semicolon. (semi)\n' +
                        ']'
                    );
                });
            });
        });
    });
    describe('<string> to lint without errors', function () {
        it('should not error', function () {
            return expect(expect.promise(function () {
                return expect('function foo() {}; foo();', 'to lint without errors');
            }), 'to be fulfilled');
        });
        it('should error', function () {
            return expect(expect.promise(function () {
                return expect("function foo() { return 'foo'; }; foo()", 'to lint without errors');
            }), 'to be rejected').then(function (err) {
                return expect(err, 'to have message',
                    "expected 'function foo() { return \\'foo\\'; }; foo()' to lint without errors\n" +
                    '\n' +
                    '[\n' +
                    '  Line 1, column 40: Missing semicolon. (semi) // should be removed\n' +
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
