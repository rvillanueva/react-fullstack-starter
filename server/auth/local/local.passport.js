import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';

export function setup(User/*, config*/) {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' // this is the virtual field on the model
  }, async function(email, password, done) {
    try {
      const user = await User.findOne({ where: { email: email.toLowerCase() }, attributes: ['_id', 'role', 'salt', 'password'] });
      if(!user || user.get('role') === 'unverified') {
        return done(null, false, { message: 'The email or password is not correct.' });
      }
      const authenticated = await user.authenticate(password);
      if(!authenticated) {
        return done(null, false, { message: 'The email or password is not correct.' });
      }
      return done(null, user);
    } catch(e) {
      console.error(e);
      return done(e);
    }
  }));
}
