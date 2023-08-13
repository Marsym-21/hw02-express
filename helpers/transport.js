import nodemailer from "nodemailer";
import "dotenv/config";

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
	host: "smtp.meta.ua",
	port: 465, //25, 465, 2525
	secure: true,
	auth: {
		user: "makson.21@meta.ua",
		pass: META_PASSWORD,
	},
	tls: {
		rejectUnauthorized: false,
	},
};

const transport = nodemailer.createTransport(nodemailerConfig);

export default transport;
