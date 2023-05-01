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

  addRegex(regex) {
    if (!regex.regex)
      throw new Error('The input must have a "regex" property.');
    regex.id = genID(ID_LENGTH);
    this.elements.push(regex);
  }

  removeRegex(id) {
    if (!this.elements.some((element) => element.id === id))
      throw new Error("There is no element with this id.");
    this.elements = this.elements.filter((element) => element.id !== id);
  }

  test(testValue) {
    return this.elements.map((el) => {
      el.result = el.regex.test(testValue);
      return el;
    });
  }

  valids(testValue) {
    return this.elements.filter((element) => element.regex.test(testValue));
  }

  invalids(testValue) {
    return this.elements.filter((element) => !element.regex.test(testValue));
  }
}
