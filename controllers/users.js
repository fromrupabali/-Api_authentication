const JWT = require('jsonwebtoken');
const User = require('../models/users');
signToken = user =>{
	return  token = JWT.sign({
			iss:'Mongolia',
			sub: user._id,
			iat: new Date().getTime(),
			exp: new Date().setDate(new Date().getDate()+1)
		}, 'apiauthentication');
}

module.exports = {

	signup: async(req, res, next) =>{
		const { email, password } = req.value.body;
		//const email = req.value.body.email;
		//const password = req.value.body.password;

		const foundUser = await User.findOne({email});
		if(foundUser)
		{
			return res.status(403).json({ error: 'Email is already exists'});
		}
		const newUser = new User ({email , password});
		await newUser.save();

	  const token = signToken(newUser);
		//res.status(200).json({
            //  user: 'created' 
		//});
		

			//Respond with token
			res.status(200).json({ token });
		},
	
	signin: async(req, res, next) =>{

		const token = signToken(req.user);
		res.status(200).json({ token });

		},
	
	secret: async(req, res, next) =>{
		console.log('i managed to get here'); 
		 res.json({ secret: 'resources'});
		}
	
	
	}

