import Contacts from "../models/contacts/index.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";
// import gravatar from "gravatar";
import resize from "../middlewares/resize.js";
import fs from "fs/promises";
import path from "path";

const getAll = async (req, res) => {
	const { _id: owner } = req.user;
	const { page = 1, limit = 20 } = req.query;
	const skip = (page - 1) * limit;
	const result = await Contacts.find({ owner }, "-createdAt -updatedAt", { skip, limit });
	res.json(result);
};

const getById = async (req, res) => {
	const result = await Contacts.findById(req.params.contactId);
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.json(result);
};

const avatarPath = path.resolve("public", "avatars");

const add = async (req, res) => {
	const { _id: owner } = req.user;
	// const { email } = req.body;
	const { path: oldPath, filename } = req.file;
	// const avatarURL = gravatar.url(email, { protocol: "http", s: "250" });

	const newPath = path.join(avatarPath, filename);
	await fs.rename(oldPath, newPath);
	const avatarURL = path.join("public/avatars", filename);
	resize(avatarURL);
	const result = await Contacts.create({ ...req.body, owner, avatarURL });
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
