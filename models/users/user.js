import { Schema, model } from "mongoose";
import Hooks from "../hooks/index.js";
import { userSubscriptionEnum } from "../../constants/index.js";

const userSchema = new Schema(
	{
		password: {
			type: String,
			minlength: 6,
			required: [true, "Set password for user"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
		},
		subscription: {
			type: String,
			enum: userSubscriptionEnum,
			default: "starter",
		},
		token: {
			type: String,
		},
	},

	{ versionKey: false, timestamps: true },
);

const User = model("User", userSchema);

userSchema.pre("findOneAndUpdate", Hooks.handleUpdateValidate);

userSchema.post("save", Hooks.handleSaveError);

userSchema.post("findOneAndUpdate", Hooks.handleSaveError);

export default User;
