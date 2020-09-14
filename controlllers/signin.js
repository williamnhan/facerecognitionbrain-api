const signinHandler = (db, bcrypt) => (req, res) => {
  const { signInEmail, signInPassword } = req.body; 
  if (!signInEmail || !signInPassword ) {
    return res.status(400).json("inccorect submission form");
  }
  db.select("email","hash")
  .from("login")
  .where("email", "=", signInEmail)
  .then(data => {
    if (data.length) {
      const isValid = bcrypt.compareSync(signInPassword, data[0].hash);
      if (isValid) {
        db.select("*").from("users").where("email", "=", signInEmail)
        .then( users => {
          console.log(1, users);
          res.json(users[0]);
        }).catch(error => res.status(400).json("unable to get user"));
      } else {
        console.log(2, data);
        res.status(400).json("username or password incorrect");
      }
    } else {
      res.status(400).json('error logging in');
    }
  }) 
}

module.exports = {
  signinHandler
};