import express from "express";
import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import config from "config";
import jwt from "jsonwebtoken";
import auth from "../../middleware/auth.js";

const router = express.Router();

router.post("/", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ msg: "please enter all fields" });
  }

  //Check existing user
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: "user does not exist's" });

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      jwt.sign(
        {
          id: user.id,
        },
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        }
      );
    });
  });
});

router.get("/user", auth, (req, res) => {
  console.log(req.user);
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

export default router;
