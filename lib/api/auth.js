const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/index");
const { check, validationResult } = require("express-validator");

const User = require("../db/models/User");

// route        api/auth
// type         POST
// access       Public
// desc         Login a user

router.post(
  "/",
  [
    check("email", "Please enter your email").isEmail(),
    check("password", "Please enter a valid password").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({
            msg: `User with email: ${email} doesn't exist... Register Instead.`
          });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials..." });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

// route        api/auth
// type         GET
// access       Private
// desc         Get logged in user

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    if (err) console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
