"use strict";
exports.__esModule = true;
var replaceTypescript = require('../index.js')

/*
This example changes authHttp to authHttp2 in Imports only.
 */

let positionsImportName = replaceTypescript.getPositions("Identifier", "authHttp", ["ImportDeclaration", "ImportClause", "NamedImports"], "./testFile.ts")
let replacements = replaceTypescript.getReplacements(positionsImportName, "authHttp2")
let newSource = replaceTypescript.applyReplacements(replacements, './testFile.ts');
console.log(newSource)