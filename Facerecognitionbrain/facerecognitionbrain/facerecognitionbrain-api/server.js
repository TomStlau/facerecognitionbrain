import express from 'express'
import bodyParser from 'body-parser'
import bcrypt from 'bcrypt'
import cors from 'cors'
import knex from 'knex'
import register from './Controllers/register.js'
import signin from '../src/components/Signin/Signin.js'
import profile from './Controllers/profile.js'
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

app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register', register.handleRegister(db, bcrypt))

app.get('/profile/:id', profile.handleProfile(db))

app.put('/image', image.handleImage(db))

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`)
})
