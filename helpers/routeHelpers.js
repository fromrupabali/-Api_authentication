const Joi = require('joi');
module.exports = {
	validateBody : (schema) =>{
		return (req, res, next) =>{
			const result = Joi.validate(req.body, schema);
			if(result.error)
			{
				return res.status(400).json(result.error);
			}

			//req.value.body insted req.body
			if(!req.value){req.value ={};}
			req.value['body'] = result.value;
			next();
		}
	},

	schemas: {
		userSchema: Joi.object().keys({
			email: Joi.string().email().required(),
			password: Joi.string().required()
		})
	}
}