import * as fs from 'node:fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const buildFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFixtureFile = (filename) => fs.readFileSync(buildFixturePath(filename), 'utf-8');

const extensions = ['json', 'yml'];

const expectedStylish = readFixtureFile('stylish.txt');
const expectedPlain = readFixtureFile('plain.txt');
const expectedJSON = readFixtureFile('json.txt');

test.each(extensions)('compares 2 files and displays differences in set format', (extension) => {
  const filepath1 = buildFixturePath(`file1.${extension}`);
  const filepath2 = buildFixturePath(`file2.${extension}`);

  expect(genDiff(filepath1, filepath2)).toEqual(expectedStylish);
  expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(expectedStylish);
  expect(genDiff(filepath1, filepath2, 'plain')).toEqual(expectedPlain);
  expect(genDiff(filepath1, filepath2, 'json')).toEqual(expectedJSON);
});

test('wrong extension', () => {
  const filepath1 = buildFixturePath('stylish.txt');
  const filepath2 = buildFixturePath('file2.json');

  expect(() => { genDiff(filepath1, filepath2); }).toThrow(Error);
});

test('wrong formatter', () => {
  const filepath1 = buildFixturePath('file1.json');
  const filepath2 = buildFixturePath('file2.json');

  expect(() => { genDiff(filepath1, filepath2, 'test'); }).toThrow(Error);
});
