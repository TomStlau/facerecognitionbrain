import express from 'express'
import bodyParser from 'body-parser'
import bcrypt from 'bcrypt'
import cors from 'cors'
import knex from 'knex'
import register from './Controllers/register.js'
import signin from '../src/components/Signin/Signin.js'
import profileServer from './Controllers/profileServer.js'
import image from './Controllers/image.js'

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
  profileServer.handleProfile(req, res, db)
})

app.put('/image', (req, res) => {
  image.handleImage(req, res, db)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`)
})
