# regex-core

Regex-core is a well-designed helpful javascript module for using regular expressions in Javascript. It has some good tools to make you felt comfortable when you work with regular expression in Javascript.

# Installation

Regex-core module is available in npm (node package manager), you can install it by writing this text to your terminal.

```
npm i regex-core
```

# Usage

Regex-core module is very easy to use. First of all you should import it to your project.

```javascript
import * as regex from "regex-core";
```

Its tools' definition is below:

## RegexTree Class

RegexTree is a javascript class that has some useful methods to work with multiple regular expressions. You can create a RegexTree object by passing an array of regular expressions to its constructor.

First of all, to use it we should import it to our project.

```javascript
import { RegexTree } from "regex-core";
```

We can create a RegexTree object by passing an array of objects that have regex property to its constructor. By the way, you should define a property called regex but you can define other properties too.

```javascript
const tree = new RegexTree([
  {
    regex: /^\d{5,6}$/,
    msg: "Must be a 5 or 6 digit number.",
  },
  {
    regex: /^.{10}$/,
    errMessage: "Must be 10 characters long.",
  },
]);
```

Its example usage is below:

```javascript
tree.addRegex({ regex: /^[abc]+$/ });
// We added a new regex object to the tree.

tree.removeRegex(tree.elements.at(-1).id);
// When we remove a regex from the tree, we must provide the id of the regex object. (We removed the last one.)

console.log(tree.elements);
// To see every regex objects in the tree.
// Output:
[
  {
    regex: /^\d{5,6}$/,
    msg: "Must be a 5 or 6 digit number.",
    id: "6801172000",
  },
  {
    regex: /^.{10}$/,
    errMessage: "Must be 10 characters long.",
    id: "9390178647",
  },
];

tree.invalids("Test");
// The output will be an array of regex objects that are invalid for this test value.

tree.valids("Test");
// The output will be an array of regex objects that are valid for this test value.

tree.test("Test");
// The output will be an array of regex objects with a result property.
```

**Some Notes:**
<br>- Every regex object has its id properties.
<br>- In test method's returning value, there is a property called result that is a boolean value to show the test's result.
