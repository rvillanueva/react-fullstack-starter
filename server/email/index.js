import {validateProps} from './components/PropTypes';

export async function create(EmailComponent, props) {
  const generated = new EmailComponent(props);
  validateProps(props, EmailComponent.propTypes);
  generated.setStylePath(EmailComponent.styles);
  await generated.init();
  return generated;
}

export class EmailFactory {
  async send(EmailComponent, props, options) {
    const created = await create(EmailComponent, props);
    await created.send(options);
  }
}

const emailFactory = new EmailFactory();

export default emailFactory;

export TeamInvitationEmail from './components/TeamInvitationEmail/TeamInvitationEmail';
export PasswordResetEmail from './components/PasswordReset/PasswordResetEmail';
export VerificationEmail from './components/Verification/VerificationEmail';
export SignupNotificationEmail from './components/SignupNotification/SignupNotificationEmail';
export {subscribeToMailingList} from './send';
