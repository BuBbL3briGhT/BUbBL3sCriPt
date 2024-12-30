const assert = require("assert");
const List  = require("../src/list");

# Let's talk about "List"

## Specify .create()

- Returns an empty list.

  assert.equal(
    List.create(),
    List.emptyList
  );

## Describe .create(item, ...)

- It should create a list with items.

  let list = List.create(1, 2, 3);
  assert.equal(list.toString(), "(1 2 3)");

## Describe .emptyList

- It should be empty list.

  let list = List.emptyList;
  assert.equal(list.isEmpty, true);
  assert.equal(list.toString(), "()");
  assert.equal(list.reverse(), list);
  assert.equal(list.map(), list);

## Describe #toString

- It should return the list formatted as a
  string.

  let list = List.create(1,2,3);
  assert.equal(list.toString(), "(1 2 3)");
  // list = list.push(Symbol.for("a"));
  // assert.equal(list.toString(), "(1 2 3 a)");
