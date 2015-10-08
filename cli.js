#!/usr/bin/env node
var standardEngine = require('standard-engine');
var opts = require('./options');

standardEngine.cli(opts);
