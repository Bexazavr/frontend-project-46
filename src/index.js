import * as fs from "node:fs";
import * as path from "path";
import _ from "lodash";

const genDiff = (filepath1, filepath2) => {
  const absPath1 = path.resolve(filepath1);
  const absPath2 = path.resolve(filepath2);

  const file1 = fs.readFileSync(absPath1);
  const file2 = fs.readFileSync(absPath2);

  const data1 = JSON.parse(file1);
  const data2 = JSON.parse(file2);

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
