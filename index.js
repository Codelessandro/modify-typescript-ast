const fs = require('fs')
const ts = require("typescript");


function nodeHasParents(node, parentNodeKinds) {

  function loopUpwards(node, parentNodeKinds) {
    if (parentNodeKinds.length == 0) {
      return true;
    }
    if (node == undefined) {
      return false;
    }
    if (ts.formatSyntaxKind(node.kind) == parentNodeKinds[parentNodeKinds.length - 1]) {
      parentNodeKinds.pop()
    }

    return loopUpwards(node.parent, parentNodeKinds)
  }

  return loopUpwards(node.parent, parentNodeKinds)

}


function getPositions(nodeKind, text, parentNodeKinds, source) {
  let positions = []

  function loopOverChildren(node, parentNodeKinds) {


    if (node.text == text && ts.formatSyntaxKind(node.kind) == nodeKind) {

      if (nodeHasParents(node, Array.from(parentNodeKinds)))
        positions.push({"start": node.pos, "end": node.end})
    }
    node.getChildren().forEach(function (c) {
      return loopOverChildren(c, parentNodeKinds);
    });
  }


  var sourceCode = fs.readFileSync(source, 'utf-8');
  var sourceFile = ts.createSourceFile('', sourceCode, ts.ScriptTarget.ES5, true);

  loopOverChildren(sourceFile, parentNodeKinds);


  return positions;
}

function getReplacements(positions, text) {
  positions.forEach(function (position) {
    position.text = text
  })
  return positions
}


function applyReplacements(replacements, sourceFile) {
  let source = fs.readFileSync(sourceFile, 'utf-8');

  replacements = replacements.sort((r1, r2) => r2.start - r1.start);
  replacements.forEach((replacement) => {
    source = source.slice(0, replacement.start) + replacement.text + source.slice(replacement.end);
  })
  return source


}


module.exports.getPositions = getPositions
module.exports.getReplacements = getReplacements
module.exports.applyReplacements = applyReplacements