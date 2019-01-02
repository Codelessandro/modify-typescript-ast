"use strict";
exports.__esModule = true;
var replaceTypescript = require('../index.js')

/*
This example changes authHttp to authHttp3 in Imports Identifier only.
 */

let newSource = modifyTypescriptAST.replace("Identifier", "AuthHttp", ["ImportDeclaration", "ImportClause", "NamedImports"], file, "AuthHttp3")
fs.writeFileSync(file, newSource)



console.log(newSource)