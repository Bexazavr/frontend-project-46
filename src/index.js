import * as fs from "node:fs";
import * as path from "path";
import _ from "lodash";
import parse from "./parsers.js";

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const getFileExtenstion = (filepath) => path.extname(filepath).slice(1);
const readFile = (filepath) => {
  const data = fs.readFileSync(getAbsolutePath(filepath));
  return parse(data, getFileExtenstion(filepath));
};

const genDiff = (filepath1, filepath2) => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);

  const keys = _.union(_.keys(data1), _.keys(data2));
  const sortedKeys = _.sortBy(keys);

  const diff = sortedKeys.map((key) => {
    if (!Object.hasOwn(data1, key)) {
      return `  + ${key}: ${data2[key]}`;
    }
    if (!Object.hasOwn(data2, key)) {
      return `  - ${key}: ${data1[key]}`;
    }
    if (data1[key] !== data2[key]) {
      return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`;
    }
    return `    ${key}: ${data1[key]}`;
  });
  const result = diff.join("\n");

  return `{\n${result}\n}`;
};

export default genDiff;
