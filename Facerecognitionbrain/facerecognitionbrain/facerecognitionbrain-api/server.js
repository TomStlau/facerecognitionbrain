import express from 'express'
import bodyParser from 'body-parser'
import bcrypt from 'bcrypt'
import cors from 'cors'
import knex from 'knex'
import register from './Controllers/register.js'

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'postgre',
    database: 'smart-brain'
  }
})

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.post('/signin', (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json('incorrect form submission')
  }
  db.select('email', 'hash')
    .from('login')
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash)
      if (isValid) {
        return db
          .select('*')
          .from('users')
          .where('email', '=', email)
          .then(user => {
            res.json(user[0])
          })
          .catch(err => res.status(400).json('unable to get user'))
      } else {
        res.status(400).json('The email or the password is not correct.')
      }
    })
    .catch(err =>
      res.status(400).json('The email or the password is not correct.')
    )
})

app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt)
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params
  db.select('*')
    .from('users')
    .where({ id: id })
    .then(user => {
      if (user.length) {
        res.json(user[0])
      } else {
        res.status(400).json('Not found')
      }
    })
    .catch(err => res.status(400).json('error getting user'))
})

app.put('/image', (req, res) => {
  const { id } = req.body
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json({ count: entries[0] })
    })
    .catch(err => res.status(400).json('unable to get entries'))
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`)
})
