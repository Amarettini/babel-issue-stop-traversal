const traverse = require("@babel/traverse").default;
const parser = require("@babel/parser");

const code = `
function hello(a, b) {
  b = "bbb";
  const c = a + b;
  console.log(b);
}
`;

const ast = parser.parse(code);

// after the first ReferencedIdentifier or AssignmentExpression node I expect the traversal to stop
// does traverse function ignore the stop() call on virtual-type nodes?
traverse(ast, {
  enter(path) {
    console.log("Enter", path.type);
    // path.stop(); // working as expected
  },
  Identifier(path) {
    // console.log("-> Identifier                (path.stop() called!)");
    // path.stop(); // working as expected
  },
  ReferencedIdentifier(path, state) {
    console.log("-> ReferencedIdentifier      (path.stop() called!)");
    path.stop(); // not working
  },
  AssignmentExpression(path, state) {
    console.log("-> AssignmentExpression      (path.stop() called!)");
    path.stop(); // not working
  },
});
