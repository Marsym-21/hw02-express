import express from "express";
import Controllers from "../../controllers/contacts-controllers.js";
import validateBody from "../../decorators/validateBody.js";
import { contactAddSchema, contactUpdateFavoriteSchema } from "../../schemas/contacts-schemas.js";
import { isEmptyBody, isValidId } from "../../middlewares/index.js";

const contactsRouter = express.Router();

contactsRouter.get("/", Controllers.getAll);

contactsRouter.get("/:contactId", isValidId, Controllers.getById);

contactsRouter.post("/", isEmptyBody, validateBody(contactAddSchema), Controllers.add);

contactsRouter.put("/:contactId", isValidId, isEmptyBody, validateBody(contactAddSchema), Controllers.update);

contactsRouter.patch(
	"/:contactId/favorite",
	isValidId,
	isEmptyBody,
	validateBody(contactUpdateFavoriteSchema),
	Controllers.updateFavorite,
);

contactsRouter.delete("/:contactId", isValidId, Controllers.deleted);

export default contactsRouter;
