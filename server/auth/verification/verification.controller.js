import {User} from '../../sqldb';
import {signToken} from '../auth.service';

export async function verifyEmail(req, res) {
  const {id, code} = req.query;
  const user = await User.scope('withSecrets').findByPk(id);
  if(!user || !user.verifyEmailVerificationToken(code)) return res.redirect('/errors/expired');
  await user.verify();
  const token = signToken(user.get('_id'), 'user');
  res.cookie('token', token);
  return res.redirect('/customers');
}
