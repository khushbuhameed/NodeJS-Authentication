const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const crypto = require('crypto');
const User = require('../models/user');



passport.serializeUser((user , done) => {
	done(null , user);
})
passport.deserializeUser(function(user, done) {
	done(null, user);
});



passport.use(new GoogleStrategy({
	clientID:"592163564227-u0tqgpfepffvrcfbv0anrpq8pf8h9hfm.apps.googleusercontent.com",
	clientSecret:"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",
	callbackURL:"http://localhost:7500/users/auth/google/callback",
	passReqToCallback:true
},
//tell passport to use a new strategy to login with google
function(request, accessToken, refreshToken, profile, done){
	// find a user
	User.findOne({email: profile.emails[0].value}).exec(function(err, user){
		if (err){console.log('error in google strategy-passport', err); return;}
		console.log(accessToken, refreshToken);
		console.log(profile);

		if (user){
			// if found, set this user as req.user
			return done(null, user);
		}else{
			// if not found, create the user and set it as req.user
			User.create({
				username: profile.displayName,
				email: profile.emails[0].value,
				password: crypto.randomBytes(20).toString('hex')
			}, function(err, user){
				if (err){console.log('error in creating user google strategy-passport', err); return;}

				return done(null, user);
			});
		}

	}); 
}


));


module.exports = passport;
