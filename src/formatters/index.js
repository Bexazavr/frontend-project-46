import formatPlain from './plain.js';
import formatStylish from './stylish.js';

const formatData = (tree, formatName) => {
  switch (formatName) {
    case 'stylish':
      return formatStylish(tree);
    case 'plain':
      return formatPlain(tree);
    default:
      throw new Error('Unknown format!');
  }
};

export default formatData;
