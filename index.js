const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const newRoute = require("./routes/news");

dotenv.config();

//mongoDB connect
mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log("DB connection Successful"))
	.catch((err) => {
		console.log(err);
	});

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/news", newRoute);

app.listen(3000, () => {
	console.log("Backend server is running!");
});
