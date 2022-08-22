const router = require("express").Router();
const { json } = require("express");
const New = require("../models/New");

//create news
router.post("/", async (req, res) => {
	const newNews = new New(req.body);
	try {
		const savedNew = await newNews.save();
		res.status(200).json(savedNew);
	} catch (err) {
		res.status(500).json(err);
	}
});

//update news
router.put("/:id", async (req, res) => {
	try {
		const news = await New.findById(req.params.id);
		if (news.userId === req.body.userId) {
			await news.updateOne({ $set: req.body });
			res.status(200).json("news has been updated");
		} else {
			res.status(403).json("You can update only you news");
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

//delete news
router.delete("/:id", async (req, res) => {
	try {
		const news = await New.findById(req.params.id);
		if (news.userId === req.body.userId) {
			await news.deleteOne();
			res.status(200).json("news has been deleted");
		} else {
			res.status(403).json("You can delete only you news");
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

//like/ dislike news
router.put("/:id/like", async (req, res) => {
	try {
		const news = await New.findById(req.params.id);
		if (!news.likes.includes(req.body.userId)) {
			await news.updateOne({ $push: { likes: req.body.userId } });
			res.status(200).json("news has been liked");
		} else {
			await news.updateOne({ $pull: { likes: req.body.userId } });
			res.status(200).json("news has been disliked");
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

//get one news
router.get("/:id", async (req, res) => {
	try {
		const news = await New.findById(req.params.id);
		res.status(200).json(news);
	} catch (err) {
		res.status(500).json(err);
	}
});

//get all news
router.get("/", async (req, res) => {
	try {
		const news = await New.find();
		res.status(200).json(news);
	} catch (err) {
		res.status(500).json(err);
	}
});
module.exports = router;
