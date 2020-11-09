import express from "express";
import Item from "../../models/Item.js";
import auth from "../../middleware/auth.js";

const router = express.Router();

router.get("/", (req, res) => {
  Item.find({ userId: req.query.userId }).then((items) => res.send(items));
});

router.post("/", auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    userId: req.body.userId,
  });
  newItem.save().then((item) => res.json(item));
});

router.delete("/:id", auth, (req, res) => {
  Item.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

export default router;
