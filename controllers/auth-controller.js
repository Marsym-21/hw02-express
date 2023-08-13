import { ctrlWrapper } from "../decorators/index.js";
import { HttpError, transport } from "../helpers/index.js";
import User from "../models/users/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { nanoid } from "nanoid";
import "dotenv/config";

const { JWT_SECRET, BASE_URL } = process.env;

const signup = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (user) {
		throw HttpError(409, "Email in use");
	}
	const hashPassword = await bcrypt.hash(password, 10);
	const verificationToken = nanoid();
	const newUser = await User.create({ ...req.body, password: hashPassword, verificationToken });

	const verifyEmail = {
		from: "makson.21@meta.ua",
		to: email,
		subject: "Verify email",
		html: `<a href="${BASE_URL}/api/auth/verify/${verificationToken}" target=_"blanck">Click verify email</a>`,
	};

	transport
		.sendMail(verifyEmail)
		.then(() => console.log("Email send success"))
		.catch(error => console.log(`${error.message}`));

	res.status(201).json({
		email: newUser.email,
		subscription: newUser.subscription,
	});
};

const verify = async (req, res) => {
	const { verificationToken } = req.params;

	const user = await User.findOne({ verificationToken });
	if (!user) {
		throw HttpError(404, "User not found");
	}
	await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: "" });

	res.json({
		message: "Verification successful",
	});
};

const resendVerifyEmail = async (req, res) => {
	const { email } = req.body;
	const user = await User.findOne({ email });

	if (!user) {
		throw HttpError(404, "missing required field email");
	}
	if (user.verify) {
		throw HttpError(400, "Verification has already been passed");
	}

	const verifyEmail = {
		from: "makson.21@meta.ua",
		to: email,
		subject: "Verify email",
		html: `<a href="${BASE_URL}/api/auth/verify/${user.verificationToken}" target=_"blanck">Click verify email</a>`,
	};

	transport
		.sendMail(verifyEmail)
		.then(() => console.log("Email send success"))
		.catch(error => console.log(`${error.message}`));

	res.json({
		message: "Verification email sent",
	});
};

const signin = async (req, res) => {
	const { password, email } = req.body;
	const user = await User.findOne({ email });

	if (!user) {
		throw HttpError(401, "Email or password invalid");
	}

	const hashPassword = await bcrypt.hash(user.password, 10);

	const passwordCompare = await bcrypt.compare(password, hashPassword);

	console.log(passwordCompare);

	if (!passwordCompare) {
		throw HttpError(401, "Email or password invalid");
	}
	const payload = { id: user._id };

	const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
	await User.findByIdAndUpdate(user._id, { token });

	res.json({
		token,
		user: {
			email: user.email,
			subscription: user.subscription,
		},
	});
};

const getCurrent = (req, res) => {
	const { email } = req.user;
	res.json({
		email,
		subscription,
	});
};

const signout = async (req, res) => {
	const { _id } = req.user;
	await User.findByIdAndUpdate(_id, { token: "" });

	res.json({
		message: "Signout success",
	});
};

export default {
	signup: ctrlWrapper(signup),
	resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
	signin: ctrlWrapper(signin),
	getCurrent: ctrlWrapper(getCurrent),
	signout: ctrlWrapper(signout),
	verify: ctrlWrapper(verify),
};
