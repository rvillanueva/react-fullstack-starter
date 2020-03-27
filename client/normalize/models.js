
export const user = function(normalizer) {
  return normalizer.define('users', {});
};

export const account = function(normalizer) {
  return normalizer.define('accounts', {});
};

export const customer = function(normalizer) {
  return normalizer.define('customers', {
    account: 'accounts'
  });
};

export const payment = function(normalizer) {
  return normalizer.define('payments', {
    customer: 'customers'
  });
};

export const accountPermission = function(normalizer) {
  return normalizer.define('accountPermissions', {
    account: 'accounts',
    user: 'users'
  });
};
