import HttpError from "../helpers/HttpError.js";
const validateBody = schema => {
	const func = (req, res, next) => {
		const { error } = schema.validate(req.body);
		if (error) {
			next(HttpError(400, "missing fields"));
		}
		next();
	};
	return func;
};

export default validateBody;
