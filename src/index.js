import * as fs from 'node:fs';
import * as path from 'path';
import parse from './parsers.js';
import formatStylish from './stylish.js';
import buildDiffTree from './buildTree.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const getFileExtenstion = (filepath) => path.extname(filepath).slice(1);
const readFile = (filepath) => {
  const data = fs.readFileSync(getAbsolutePath(filepath));
  return parse(data, getFileExtenstion(filepath));
};

const genDiff = (filepath1, filepath2, defaultFormat = 'stylish') => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const tree = buildDiffTree(data1, data2);
  return formatStylish(tree);
};

export default genDiff;
