const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const signin = require('./controlllers/signin');
const register = require('./controlllers/register');
const profile = require('./controlllers/profile');
const image = require('./controlllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'smart-brain',
    password: '1234',
    database: 'smart_brain'
  }
})
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.json(database.users) });

app.post('/signin', signin.signinHandler(db, bcrypt));
// app.post('/signin', signin.signinHandler(db, bcrypt)(req, res));

app.post('/register', (req, res) => register.registerHandler(req, res, db, bcrypt));

app.get('/profile/:id', profile.profileHandler(db));

app.put('/image', image.imageHandler(db));
app.post('/imageUrl', (req, res) => image.imageHandlerUrl()(req, res));

app.listen(port, () => console.log('Server is running port: ' + port) );

