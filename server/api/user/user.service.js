import {User} from '../../sqldb';
import emailer, {VerificationEmail, SignupNotificationEmail} from '../../email';
import config from '../../config/environment';

export async function sendEmailVerification(userId) {
  const user = await User.scope('withSecrets').findByPk(userId);
  if(!user) throw new Error(`No user found with id ${userId}.`);
  user.generateEmailVerificationToken();
  await user.save();
  await emailer.send(VerificationEmail, {
    userId: user.get('_id'),
    userEmail: user.get('email'),
    token: user.get('emailVerificationToken')
  });
  return;
}

export async function handlePostRegistrationExternalServices(user) {
  try {
    if(config.adminSettings.notifyOnSignup) {
      await emailer.send(SignupNotificationEmail, {user});
    }
    if(config.env === 'production') {
      //await subscribeToMailingList(user.email, user.name);
    }
  } catch(e) {
    console.error(e);
  }
}
