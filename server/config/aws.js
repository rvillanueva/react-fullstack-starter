import AWS from 'aws-sdk';
import config from './environment';

const awsConfig = new AWS.Config({
  region: config.aws.region
});

export default awsConfig;
