import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/userModels.js';


const initializingPassport = (passport) =>{
    passport.use(new LocalStrategy(
        {
          usernameField: 'email', 
          passwordField: 'password',
        },
        async (email, password, done) => {
          try {
            const user = await User.findOne({ email: email });
            if (!user) {
              return done(null, false, { message: 'Incorrect email.' });
            }
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
              return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
          } catch (err) {
            return done(err);
          }
        }
      ));
      
      // Serialize user to the session
      passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
      // Deserialize user from the session
      passport.deserializeUser(async (id, done) => {
        try {
          const user = await User.findById(id);
          done(null, user);
        } catch (err) {
          done(err);
        }
      });

}




export default initializingPassport