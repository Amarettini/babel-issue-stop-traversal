# Repo for reproduction of possible babel bug/issue.

## Observed issue


`path.stop()` method does not stop the traversal when called on `ReferencedIdentifiers`/`AssignmentExpression` nodes.

## Expected behaviour

`path.stop()` should stop the traversal as soon as the method was called.

## Files index

[index.js](index.js) - The code where i first noticed the issue. The begin of rewritting my plugin in a more maintainable way. First version of the plugin was more of a proof of concept.

[index-short.js](index-short.js) - Isolated example of the problem showing the problem for `ReferencedIdentifier` nodes and `AssignmentExpression` nodes.

[index-short-short.js](index-short-short.js) - most basic reproduction example.