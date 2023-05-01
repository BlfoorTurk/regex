import { ID_LENGTH } from "./config.js";

const genID = function (length) {
  const characters = "1234567890";
  let result = "";
  for (let i = 1; i <= length; i++) {
    result += characters[Math.floor(Math.random() * characters.length)];
  }
  return result;
};

export class RegexTree {
  /**
   * @description A class to test multiple regexes at once.
   * @param {Array} regexes An array of object with a "regex" property.
   * @returns {RegexTree}
   */
  constructor(regexes) {
    if (!Array.isArray(regexes))
      throw new Error("Regexes must be in an array.");
    if (!regexes.every((regex) => Boolean(regex.regex)))
      throw new Error('Every regex must have a "regex" property.');
    this.elements = regexes.map((regex) => {
      regex.id = genID(ID_LENGTH);
      return regex;
    });
  }

  /**
   * @description A function for adding a new regex to the tree.
   * @param {Object} regex An object with a "regex" property.
   */
  addRegex(regex) {
    if (!regex.regex)
      throw new Error('The input must have a "regex" property.');
    regex.id = genID(ID_LENGTH);
    this.elements.push(regex);
  }

  /**
   * @description A function for removing a regex from the tree.
   * @param {String} id The id of the regex which you want to remove.
   */
  removeRegex(id) {
    if (!this.elements.some((element) => element.id === id))
      throw new Error("There is no element with this id.");
    this.elements = this.elements.filter((element) => element.id !== id);
  }

  /**
   * @description A function for testing all of the regexes in the tree for a value.
   * @param {String} testValue The value which will be tested for all of the regexes in the tree.
   * @returns {Array} An array of objects with the regexes that have a result property.
   */
  test(testValue) {
    return this.elements.map((el) => {
      el.result = el.regex.test(testValue);
      return el;
    });
  }

  /**
   * @description A function for testing all of the regexes in the tree for a test value and returning the valid ones.
   * @param {String} testValue The value which will be tested for all of the regexes in the tree.
   * @returns {Array} An array of regex objects that are valid for this test value.
   */
  valids(testValue) {
    return this.elements.filter((element) => element.regex.test(testValue));
  }

  /**
   * @description A function for testing all of the regexes in the tree for a test value and returning the invalid ones.
   * @param {String} testValue The value which will be tested for all of the regexes in the tree.
   * @returns {Array} An array of regex object that are invalid for this test value.
   */
  invalids(testValue) {
    return this.elements.filter((element) => !element.regex.test(testValue));
  }
}
