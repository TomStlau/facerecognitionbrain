import express from 'express'
import bodyParser from 'body-parser'
import bcrypt from 'bcrypt'
import cors from 'cors'
import knex from 'knex'
import { handleRegister } from './Controllers/register.mjs'
import { handleSignin } from './Controllers/signin.mjs'
import { handleProfile } from './Controllers/profile.mjs'
import { handleImage } from './Controllers/image.mjs'

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

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/signin', (req, res) => {
  handleSignin(db, bcrypt, req, res)
})

app.post('/register', (req, res) => {
  handleRegister(db, bcrypt, req, res)
})

app.get('/profile/:id', (req, res) => {
  handleProfile(req, res, db)
})

app.put('/image', (req, res) => {
  handleImage(req, res, db)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`)
})
