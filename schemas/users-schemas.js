import Joi from "joi";

import { userSubscriptionEnum } from "../constants/index.js";

const userSignupSchema = Joi.object({
	password: Joi.string().min(6).required().messages({ "any.required": "Set password for user" }),
	email: Joi.string().required().messages({ "any.required": "Email is required" }),
	subscription: Joi.string()
		.valid(...userSubscriptionEnum)
		.required(),
	token: Joi.string(),
});

const userSigninSchema = Joi.object({
	password: Joi.string().min(6).required().messages({ "any.required": "Set password for user" }),
	email: Joi.string().required().messages({ "any.required": "Email is required" }),
});

export default { userSignupSchema, userSigninSchema };
