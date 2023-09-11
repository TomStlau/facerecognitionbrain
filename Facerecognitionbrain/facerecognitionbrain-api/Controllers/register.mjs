const handleRegister = (db, bcrypt, req, res) => {
  const { email, name, password } = req.body
  const hash = bcrypt.hashSync(password, 10)
  db.transaction(trx => {
    trx
      .insert({
        hash: hash,
        email: email
      })
      .into('login')
      .returning('email')
      .then(async email => {
        const user = await trx('users').returning('*').insert({
          email: email[0].email,
          name: name,
          joined: new Date()
        })
        res.json(user[0])
      })
      .then(trx.commit)
      .catch(trx.rollback)
  }).catch(err => res.status(400).json('unable to register'))
}

export { handleRegister }
