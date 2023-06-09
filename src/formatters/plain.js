import _ from 'lodash';

const stringify = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }
  if (typeof data === 'string') {
    return `'${data}'`;
  }
  return data;
};

const iter = (tree, path) => tree.flatMap((node) => {
  const propertyName = [...path, node.key];
  switch (node.type) {
    case 'nested':
      return iter(node.children, propertyName);
    case 'added':
      return `Property '${propertyName.join('.')}' was added with value: ${stringify(node.value)}`;
    case 'removed':
      return `Property '${propertyName.join('.')}' was removed`;
    case 'changed':
      return `Property '${propertyName.join('.')}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
    case 'unchanged':
      return [];
    default:
      throw new Error(`Unknown type: ${node.type}`);
  }
});

const formatPlain = (data) => `${iter(data, []).join('\n')}`;

export default formatPlain;
