import Stripe from 'stripe';
import config from '../config/environment';
import {Integration} from '../sqldb';

const stripe = Stripe(config.stripe.secret);

export async function createStripeByAccountId(accountId) {
  if(accountId === config.waypostAccountId) return stripe;
  const integration = await Integration.scope('withSecrets').findOne({
    where: {
      provider: 'stripe',
      accountId
    }
  });
  if(!integration) return null;
  const accessToken = await integration.getAccessToken();
  return Stripe(accessToken);
}

export default stripe;
