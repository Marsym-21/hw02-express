import express from "express";
import { ContactsControllers } from "../../controllers/index.js";
import { validateBody } from "../../decorators/index.js";
import { contactsSchemas } from "../../schemas/index.js";
import { isEmptyBody, isValidId } from "../../middlewares/index.js";
import { authenticate } from "../../middlewares/index.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", ContactsControllers.getAll);

contactsRouter.get("/:contactId", isValidId, ContactsControllers.getById);

contactsRouter.post("/", isEmptyBody, validateBody(contactsSchemas.contactAddSchema), ContactsControllers.add);

contactsRouter.put(
	"/:contactId",
	isValidId,
	isEmptyBody,
	validateBody(contactsSchemas.contactAddSchema),
	ContactsControllers.update,
);

contactsRouter.patch(
	"/:contactId/favorite",
	isValidId,
	isEmptyBody,
	validateBody(contactsSchemas.contactUpdateFavoriteSchema),
	ContactsControllers.updateFavorite,
);

contactsRouter.delete("/:contactId", isValidId, ContactsControllers.deleted);

export default contactsRouter;
