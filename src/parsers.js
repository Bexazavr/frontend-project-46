import yaml from 'js-yaml';

const parse = (file, format) => {
  switch (format) {
    case 'yml':
    case 'yaml':
      return yaml.load(file);
    case 'json':
      return JSON.parse(file);
    default:
      throw new Error('Wrong file format!');
  }
};

export default parse;
