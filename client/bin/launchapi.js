#! /usr/bin/env node
var shell = require("shelljs")
shell.cd("..");
shell.cd("API");
shell.echo("moved to API directory");
shell.exec("gulp launch");
