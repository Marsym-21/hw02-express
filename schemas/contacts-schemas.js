import Joi from "joi";
const contactAddSchema = Joi.object({
	name: Joi.string().required().messages({ "any.required": "Set name for contact" }),
	email: Joi.string().required(),
	phone: Joi.string().required(),
	favorite: Joi.boolean(),
	// owner: Joi.string().required(),
});

const contactUpdateFavoriteSchema = Joi.object({
	favorite: Joi.boolean().required(),
});

export default { contactAddSchema, contactUpdateFavoriteSchema };
