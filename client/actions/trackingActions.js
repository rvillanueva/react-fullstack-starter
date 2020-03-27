export function trackEvent(type) {
  return async function() {
    try {
      if(mixpanel) { // eslint-disable-line no-undef
        mixpanel.track(type); // eslint-disable-line no-undef
      }
      if(typeof gtag === 'function' && process.env.GOOGLE_ADS_ID) { // eslint-disable-line no-undef, camelcase
        let conversionId;
        if(type === 'signup') {
          conversionId = process.env.GOOGLE_ADS_SIGNUP_CONVERSION_ID;
          gtag('event', 'conversion', { // eslint-disable-line no-undef, camelcase
            send_to: `${process.env.GOOGLE_ADS_ID}/${conversionId}` // eslint-disable-line camelcase
          });
        } else {
          return;
        }
      }
    } catch(err) {
      console.error(err);
    }
  };
}

export function identifyUser(userId, user) {
  return async function() {
    try {
      if(mixpanel) { // eslint-disable-line no-undef
        mixpanel.identify(userId); // eslint-disable-line no-undef
        if(user) {
          const userProps = {
            $last_login: new Date() // eslint-disable-line camelcase
          };
          if(user.email) {
            userProps.$email = user.email;
          }
          if(user.name) {
            userProps.name = user.name;
          }
          mixpanel.people.set(userProps); // eslint-disable-line no-undef
        }
      }
    } catch(err) {
      console.error(err);
    }
  };
}
