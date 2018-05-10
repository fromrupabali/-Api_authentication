const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy  = require('passport-local').Strategy;
const User = require('./models/users');

//JSON WEB TOKEN STRATEGY
passport.use(new JwtStrategy({
   jwtFromRequest: ExtractJwt.fromHeader('authorization'),
   secretOrKey: 'apiauthentication'
}, async(payload, done) =>{
   try{

   	//Find the user specified in token ;
     const user = await User.findById(payload.sub);

     // if user doesn't exists , handle it
     if(!user){
     	return done(null, false);
     }

   	//Otherwise, return the user
   	return done(null, user);

   }catch(error){
      done(error, false);
   }
}));

// LOCAL STRATEGY
passport.use(new LocalStrategy({
	usernameField:'email'
}, async(email, password, done) =>{
	try{
		const user = await User.findOne({email});

	//if not handale it
	if(!user){
     	return done(null, false);
     }

	//Check the password id correct
	const isMatch = await user.isValidPassword(password);

	// If not ,handle it
	if(!isMatch)
	{
		return done(null, false);
	}

	//Otherwise return the user
	done(null, user);  

	}catch(error){
		done(error, false);

	}

	//Find the user gives the email
	

}))