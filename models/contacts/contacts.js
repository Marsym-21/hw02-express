import { Schema, model } from "mongoose";
import Hooks from "../hooks/index.js";

const contactsSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Set name for contact"],
		},
		email: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		favorite: {
			type: Boolean,
			default: false,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: "user",
			required: true,
		},
		avatarURL: { type: String, required: true },
	},
	{ versionKey: false, timestamps: true },
);

const Contacts = model("Contacts", contactsSchema);

contactsSchema.pre("findOneAndUpdate", Hooks.handleUpdateValidate);

contactsSchema.post("save", Hooks.handleSaveError);

contactsSchema.post("findOneAndUpdate", Hooks.handleSaveError);

export default Contacts;

// import fs from "fs/promises";
// import path from "path";
// import { nanoid } from "nanoid";

// const contactsPath = path.resolve("models", "contacts.json");

// const updateContacts = contacts => {
// 	return fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
// };

// const listContacts = async () => {
// 	const data = await fs.readFile(contactsPath);
// 	return JSON.parse(data);
// };

// const getContactById = async contactId => {
// 	const contacts = await listContacts();
// 	const result = contacts.find(item => item.id === contactId);
// 	return result || null;
// };

// const removeContact = async contactId => {
// 	const contacts = await listContacts();
// 	const index = contacts.findIndex(item => item.id === contactId);
// 	if (index === -1) {
// 		return null;
// 	}
// 	const [result] = contacts.splice(index, 1);
// 	await updateContacts(contacts);
// 	return result || null;
// };

// const addContact = async body => {
// 	const contacts = await listContacts();

// 	const newContact = {
// 		id: nanoid(),
// 		...body,
// 	};

// 	contacts.push(newContact);
// 	await updateContacts(contacts);
// 	return newContact;
// };

// const updateContact = async (contactId, { name, email, phone }) => {
// 	const contacts = await listContacts();
// 	const index = contacts.findIndex(item => item.id === contactId);
// 	if (index === -1) {
// 		return null;
// 	}

// 	contacts[index] = { id: contactId, name, email, phone };
// 	await updateContacts(contacts);
// 	return contacts[index];
// };

// export default {
// 	listContacts,
// 	getContactById,
// 	removeContact,
// 	addContact,
// 	updateContact,
// };
