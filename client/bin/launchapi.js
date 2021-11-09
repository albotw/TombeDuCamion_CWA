#! /usr/bin/env node
var shell = require("shelljs")
shell.exec("echo shell.exec works !");
shell.cd("..");
shell.cd("API");
shell.exec("gulp launch");
