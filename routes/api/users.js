import express from "express";
import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import config from "config";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ msg: "please enter all fields" });
  }

  //Check existing user
  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: "user already exist's" });
    const newUser = new User({
      name,
      email,
      password,
    });

    //create salt and hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
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
  });
});

export default router;
