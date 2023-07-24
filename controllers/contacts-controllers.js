import Contacts from "../models/contacts.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
// import contactAddSchema from "../schemas/contacts-schemas.js";

const getAll = async (req, res) => {
	const result = await Contacts.find();
	res.json(result);
};

const getById = async (req, res) => {
	const result = await Contacts.findById(req.params.contactId);
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.json(result);
};

const add = async (req, res) => {
	console.log(req.body.length);
	const result = await Contacts.create(req.body);
	res.status(201).json(result);
};

const update = async (req, res) => {
	const result = await Contacts.findByIdAndUpdate(req.params.contactId, req.body, { new: true });
	console.log(result);
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.status(200).json(result);
};

const updateFavorite = async (req, res) => {
	const result = await Contacts.findByIdAndUpdate(req.params.contactId, req.body, { new: true });
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.status(200).json(result);
};

const deleted = async (req, res) => {
	const result = await Contacts.findByIdAndDelete(req.params.contactId);
	if (!result) {
		throw HttpError(404, "Not found");
	}
	throw HttpError(200, "contact deleted");
};

export default {
	getAll: ctrlWrapper(getAll),
	getById: ctrlWrapper(getById),
	add: ctrlWrapper(add),
	update: ctrlWrapper(update),
	updateFavorite: ctrlWrapper(updateFavorite),
	deleted: ctrlWrapper(deleted),
};
