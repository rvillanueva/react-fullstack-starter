import Mixpanel from 'mixpanel';
import config from '../config/environment';

let mixpanel;
if(config.mixpanel.id) {
  mixpanel = Mixpanel.init(config.mixpanel.id);
}

export async function trackEvent(eventName, metadata) {
  if(mixpanel) {
    return mixpanel.track(eventName, metadata);
  }
}
