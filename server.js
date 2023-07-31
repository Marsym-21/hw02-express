import mongoose from "mongoose";
import "dotenv/config";
import app from "./app.js";
import process from "node:process";

process.on("exit", code => {
	console.log(`About to exit with code: ${code}`);
});

const { DB_HOST, PORT } = process.env;
mongoose
	.connect(DB_HOST)
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Database connection successful. Use our API on port: ${PORT}`);
		});
	})
	.catch(error => {
		console.log(`Server not running. Error message: ${error.message}`), process.exit(1);
	});
