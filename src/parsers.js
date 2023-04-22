import yaml from 'js-yaml';

const parse = (file, extension) => {
  switch (extension) {
    case 'yml':
    case 'yaml':
      return yaml.load(file);
    case 'json':
      return JSON.parse(file);
    default:
      throw new Error('Wrong file extension!');
  }
};

export default parse;
