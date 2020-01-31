const router = require("express").Router();
const Users = require("./auth-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const { jwtSecret } = require("./secret")


router.get("/users", async (req, res) => {
  try {
    const user = await Users.find();
    if (user) res.status(200).json(user);
  } catch {
    res.status(500).json({ error: "can't find users" });
  }
});

router.post("/register", async (req, res) => {
  // implement registration
  const hash = bcrypt.hashSync(req.body.password, 8);
  req.body.password = hash;
  try {
    const user = await Users.add(req.body);
    if (user) res.status(200).json(user);
  } catch {
    res.status(500).json({ error: "can't add user" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("rq.body", req.body)
  const user = await Users.findBy({ username }).first();
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = signToken(user)
    res.status(200).json({message: `${user.username} is now logged in and has token ${token}`});
  }
  else res.status(401).json({error: "invalid creds"})
});


function signToken(user){
  const payload = { user }
  const options = { expiresIn: "12h"}
  return jwt.sign(payload, jwtSecret, options)
}

module.exports = router;
