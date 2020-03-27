import plaid from 'plaid';
import config from '../config/environment';

const plaidClient = new plaid.Client(
  config.plaid.clientId,
  config.plaid.secret,
  config.plaid.publicKey,
  plaid.environments[config.plaid.env]
);

export function exchangePublicToken(publicToken) {
  return new Promise((resolve, reject) => {
    plaidClient.exchangePublicToken(publicToken, (err, res) => {
      if(err) return reject(err);
      resolve(res);
    });
  });
}

export function getAccounts(accessToken) {
  return new Promise((resolve, reject) => {
    plaidClient.getAccounts(accessToken, (err, res) => {
      if(err) return reject(err);
      resolve(res);
    });
  });
}

export function createStripeToken(accessToken, plaidBankAccountId) {
  return new Promise(async(resolve, reject) => {
    plaidClient.createStripeToken(accessToken, plaidBankAccountId, (err, res) => {
      if(err) return reject(err);
      resolve(res);
    });
  });
}
