import Joi from "joi";
export const contactAddSchema = Joi.object({
	name: Joi.string().required().messages({ "any.required": "Set name for contact" }),
	email: Joi.string().required(),
	phone: Joi.string().required(),
	favorite: Joi.boolean(),
});

export const contactUpdateFavoriteSchema = Joi.object({
	favorite: Joi.boolean().required(),
});
