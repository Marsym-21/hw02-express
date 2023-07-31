const handleSaveError = (error, data, next) => {
	const { cone, name } = error;
	error.status = code === 11000 && name === "MongoServerError" ? 409 : 400;
	next();
};

const handleUpdateValidate = next => {
	this.options.runValidators = true;
	next();
};

export default { handleSaveError, handleUpdateValidate };
