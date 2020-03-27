import AWS from 'aws-sdk';
import axios from 'axios';
import config from '../../config/environment';
import crypto from 'crypto';

const ses = new AWS.SES();

export function sendEmail(params) {
  return new Promise((resolve, reject) => {
    ses.sendEmail(params, function(err, data) {
      if(err) {
        console.error(err, err.stack);
        return reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

export async function subscribeToMailingList(email, fullName) {
  const splitName = fullName.split(' ');
  const FNAME = splitName[0] || '';
  const LNAME = splitName.length > 1 ? splitName.slice(1).join(' ') : '';
  const subscriberHash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
  return axios({
    method: 'PUT',
    url: `https://${config.mailchimp.region}.api.mailchimp.com/3.0/lists/${config.mailchimp.listId}/members/${subscriberHash}`,
    auth: {
      user: 'waypost-app',
      password: config.mailchimp.secret
    },
    data: {
      email_address: email, // eslint-disable-line camelcase
      status_if_new: 'subscribed', // eslint-disable-line camelcase
      status: 'subscribed',
      merge_fields: { // eslint-disable-line camelcase
        FNAME,
        LNAME
      }
    }
  });
}
