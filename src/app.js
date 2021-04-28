/* eslint-disable quotes */
/* eslint-disable no-useless-escape */

const express = require('express')
const config = require('config')
const path = require('path')

const RssParser = require('./utils/rssparser')
const MailBuilder = require('./utils/mailbuilder')
const MailSender = require('./utils/mailsender')

const Database = require('./storage/database')

const UserController = require('./controllers/usercontroller')
const MailController = require('./controllers/mailcontroller')

const userRoutes = require('./routes/userroutes')
const mailRoutes = require('./routes/mailroutes')

const dbConfig = config.get('feedmail.db')
const senderConfig = config.get('feedmail.mailgun')

const db = new Database()
db.connect(dbConfig)

const userController = new UserController(db)
const mailController = new MailController(db, new RssParser(), new MailBuilder(), new MailSender(senderConfig))

const app = express()

app.use(express.static(path.join(__dirname, '../public')))
app.use(express.json());

app.use('/v1', userRoutes(userController))
app.use('/v1', mailRoutes(mailController))

module.exports = app