const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			require: true,
			unique: true,
		},
		lastName: {
			type: String,
			require: true,
			unique: true,
		},
		email: {
			type: String,
			require: true,
			max: 50,
			unique: true,
		},
		address: {
			type: String,
			require: true,
		},
		phone: {
			type: Number,
			require: true,
		},
		nCin: {
			type: Number,
			require: true,
		},
		nInscription: {
			type: Number,
			require: true,
		},
		class: {
			type: Array,
			require: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Student", StudentSchema);
