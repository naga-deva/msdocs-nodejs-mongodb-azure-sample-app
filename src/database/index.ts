import mongoose from "mongoose";
import helpers from "@src/helpers";
const logger = helpers.logger;
mongoose.set("strictQuery", false);
mongoose
	.connect('mongodb+srv://clicklinkdevuser:hcQr2rLtEXb2Q97J@clickilinkcluster.ylsuhh1.mongodb.net/?retryWrites=true&w=majority') //mongodb://localhost:27017/clickilink
	.then(() => {
		logger.info("Connected to MongoDB");
	})
	.catch((err: Error) => {
		logger.info(`Database: ${err.message}`);
	});
