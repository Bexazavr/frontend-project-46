import * as fs from 'node:fs';
import * as path from 'path';
import getParsedData from './parsers.js';
import formatData from './formatters/index.js';
import buildDiffTree from './buildTree.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const getFileFormat = (filepath) => path.extname(filepath).slice(1);
const getData = (filepath) => fs.readFileSync(getAbsolutePath(filepath));

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getParsedData(getData(filepath1), getFileFormat(filepath1));
  const data2 = getParsedData(getData(filepath2), getFileFormat(filepath2));
  const tree = buildDiffTree(data1, data2);
  return formatData(tree, formatName);
};

export default genDiff;
