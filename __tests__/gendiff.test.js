import { fileURLToPath } from "url";
import { dirname, join } from 'path';
import genDiff from "../src/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, "..", "__fixtures__", filename);

test('flat JSON', () => {
  const filepath1 = getFixturePath("file1.json");
  const filepath2 = getFixturePath("file2.json");

  const actual1 = genDiff(filepath1, filepath2);

  expect(actual1).toEqual(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
});
