const registerHandler = (req, res, db, bcrypt) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json("inccorect submission form");
  }
  const hash = bcrypt.hashSync(password);
  db.transaction( trx => {
    trx.insert({
      hash: hash,
      email: email
    }).into("login")
    .returning("email")
    .then( loginEmail => {
      return trx('users')
      .returning("*")
      .insert({
        name: name,
        email: loginEmail[0],
        entries: 0,
        joined: new Date()
      }).then(users => res.json(users[0]) )
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
  .catch(error => res.status(400).json('unable to register'))
}
module.exports = {
  registerHandler: registerHandler
};