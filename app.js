require("dotenv").config();
require('colors');
require("./config/database").connect();

const express = require("express");
const auth = require("./middleware/auth");
const app = express();

app.use(express.json());
module.exports = app;

// importing user context
const User = require("./model/user");

app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌");
});

// Register
app.post("/register", (req, res) => {
  // our register logic goes here...
  try {
    const { first_name, last_name, password } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedpassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      password: encryptedpassword,
      email: email.toLowerCase(),
    });

    // Create token
    const token = jwtObject.assign(
      {
        user_id: user_id,
        email,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    user.token = token;
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

// Login
app.post("/login", (req, res) => {
  // our login logic goes here
  try {
    //Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    // Validate if user exist in our database
    const user = await Uset.finsOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user_id, email },
        process.env.TOKEN_KEY,
        { expiresIn: "2h" }
      );
      // save user taken
      user.taken = taken;

      //user
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (error) {
    console.log(err);
  }
});
