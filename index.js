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

const state = { currentIdName: "b" };

traverse(ast, {
  enter(path) {
    console.log("Enter", path.type);
  },
  ReferencedIdentifier(path, state) {
    if (path.node.name === state.currentIdName) {
      console.log("Referencing identifier", path.node.name, "at", path.node.loc?.start.line);
      this.reassigned = false;
      path.stop();
      console.log("stop() called.");
    }
  },
  AssignmentExpression(path, state) {
    if (
      path.node.operator === "=" &&
      path.node.left.type === "Identifier" &&
      path.node.left.name === state.currentIdName
    ) {
      console.log("Assignment of", path.node.left.name, "=", path.node.right.type, "at", path.node.loc?.start.line);
      this.reassigned = true;
      path.stop();
      console.log("stop() called.");
    }
  },
}, undefined, state);

console.log(state);

// different implementation only using enter(), same problem.
// traverse(
//   ast,
//   {
//     enter(path, state) {
//       console.log("enter", path.type);
//       if (path.isReferencedIdentifier()) {
//         if (path.node.name === state.currentIdName) {
//           console.log("Referencing identifier", path.node.name, "at", path.node.loc?.start.line);
//           this.reassigned = false;
//           path.stop();
//           console.log("stop() called.");
//         }
//       }
//       if (path.isAssignmentExpression()) {
//         if (
//           path.node.operator === "=" &&
//           path.node.left.type === "Identifier" &&
//           path.node.left.name === state.currentIdName
//         ) {
//           console.log("Assignment of", path.node.left.name, "=", path.node.right.type, "at", path.node.loc?.start.line);
//           this.reassigned = true;
//           path.stop();
//           console.log("stop() called.");
//         }
//       }
//     },
//   },
//   undefined,
//   state
// );
