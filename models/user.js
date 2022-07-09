const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: false },
	lastName: { type: String, required: false },
	email: { type: String, required: true },
    dateOfBirth: { type: Date, required: false },
    mobile: { type: Number, required: false },
    status: { type: Boolean, required: true },
    accountType: { type: String, required: true },
	password: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};


const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
        dateOfBirth: Joi.date().required().label("Date of Birth"),
        mobile: Joi.number().required().label("Mobile"),
        status: Joi.boolean().required().label("Status"),
        accountType: Joi.string().required().label("Account Type"),
        
	});
	return schema.validate(data);
};

module.exports = { User, validate };