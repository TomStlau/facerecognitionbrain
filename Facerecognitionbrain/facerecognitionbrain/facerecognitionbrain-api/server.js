import express from 'express'
import bodyParser from 'body-parser'
import bcrypt from 'bcrypt'
import cors from 'cors'
import knex from 'knex'
import register from './Controllers/register.js'
import signin from '../src/components/Signin/Signin.js'

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
  signin.handleSignin(req, res, db, bcrypt)
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
