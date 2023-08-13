import express from "express";
import { AuthControllers } from "../../controllers/index.js";
import { validateBody } from "../../decorators/index.js";
import { usersSchemas } from "../../schemas/index.js";
import { authenticate } from "../../middlewares/index.js";

const authRouter = express.Router();

authRouter.post("/signup", validateBody(usersSchemas.userSignupSchema), AuthControllers.signup);
authRouter.get("/verify/:verificationToken", AuthControllers.verify);
authRouter.post("/verify", validateBody(usersSchemas.userEmailSchema), AuthControllers.resendVerifyEmail);
authRouter.post("/signin", validateBody(usersSchemas.userSigninSchema), AuthControllers.signin);
authRouter.get("/current", authenticate, AuthControllers.getCurrent);
authRouter.post("/signout", authenticate, AuthControllers.signout);

export default authRouter;
