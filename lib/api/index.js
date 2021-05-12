const statusAPI = require("./status");
const {
    MongoDB
} = require("../../lib/db");
const defaultConfig = require("../../config");
let db = new MongoDB(defaultConfig.db);
let User = db.models.User;
const API = require("express").Router();

API.use("/status", statusAPI);

API.put('/users', (req, res, next) => [
  console.log("user put update")
])



API.post('/login', async(req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;

    let user = await User.findOne({
        email: email,
        password: password
    });

    if (user) {
        return res.status(200).json("success");
    }

    return res.status(401).json("Forbiden")
});

API.post('/register', async(req, res, next) => {
 
    let password = req.body.password;
    let email = req.body.email;

    let user = User.findOne({
        email: email
    });

    if (user) {
        return res.status(409).json("the user exist already!")
    }

    let newUser = await User.create({
         email: email,
        password: password,
       
    })

    return res.status(200).json(newUser)
});

API.get('/users', (req, res, next) => {
  console.log('fetch user');
});

/*
API.delete("/delete",async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
*/



module.exports = {
  statusAPI,
  API,
};
