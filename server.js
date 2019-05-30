var express = require('express')
var session = require('express-session')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var morgan = require('morgan')
var app = express()

var port = process.env.PORT || 1337

var passport = require('passport')
var flash = require('connect-flash')

require('./config/passport')(passport);
app.engine('html', require('ejs').renderFile);
app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(session({
    secret: "whateversecre",
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(express.static(__dirname + '/public_static'))


app.set('view engine', 'ejs')

require('./app/routes.js')(app, passport)

app.listen(port)
console.log('Port: ' + port)