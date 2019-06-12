var mysql = require('mysql')
var dbconfig = require('../config/database')
var connection = mysql.createConnection(dbconfig.connection)
var express = require('express')
var path = require('path')

module.exports = function (app, passport) {
    /*app.get('/', function (req, res) {
        res.render('index.ejs')
    })*/
    app.get('/login', function (req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') })
    })

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }),
        function (req, res) {
            if (req.body.remember) {
                req.session.cookie.maxAge = 100 * 60 * 3
            }
            else {
                req.session.cookie.expires = false
            }
            res.redirect('/')
        }
    )

    app.get('/signup', function (req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') })
    })

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: true
    }))

    let reqPath = path.join(__dirname, '../')
    app.get('/', isLoggedIn, function (req, res) {
        res.render('home')
    })

    //app.use('/home', express.static(reqPath + 'public_static'))

    app.get('/logout', function (req, res) {
        req.logout()
        res.redirect('/login')
    })

    app.post('/getData1', function (req, res) {
        getData1(res)
    })

    app.post('/getData2', function (req, res) {
        getData2(res)
    })

    app.post('/getData3', function (req, res) {
        getData3(res)
    })

    app.post('/getResp', function (req, res) {
        connection.query('USE ' + dbconfig.database)
        connection.query("SELECT response FROM tb_address where address = ? ", [req.body.value], (err, rows, fields) => {
            if (err)
                console.log(err)
            //console.log(rows)
            res.send(rows)
        })
    })

    app.post('/putData', function (req, res) {
        console.log([req.body.value, req.body.rowv])
        connection.query('USE ' + dbconfig.database)
        connection.query('UPDATE tb_status SET status = ? , timestamp = CURRENT_TIMESTAMP WHERE chno = ?', [req.body.value, req.body.rowv], (err) => {

            if (err) {
                x = { status: 0 }
                res.send(x)
            }
            else {
                x = { status: 1 }
                res.send(x)
            }
        })
    })
    app.get('/getLocations', function (req, res) {
        connection.query('USE ' + dbconfig.database)
        connection.query('SELECT location FROM locations', (err, rows, fields) => {
            if (err) {
                console.log(err)
            }
            res.send(rows)
        });
    })

}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

function getData1(res) {
    connection.query('USE ' + dbconfig.database)
    connection.query("SELECT * FROM tb_status where chno >= 1 and chno <= 24", (err, rows, fields) => {
        if (err)
            console.log(err)
        //console.log(rows)
        res.send(rows)
    })
}
function getData2(res) {
    connection.query('USE ' + dbconfig.database)
    connection.query("SELECT * FROM tb_status where chno >= 25 and chno <= 32", (err, rows, fields) => {
        if (err)
            console.log(err)
        //console.log(rows)
        res.send(rows)
    })
}

function getData3(res) {
    connection.query('USE ' + dbconfig.database)
    connection.query("SELECT * FROM tb_status where chno >= 33 and chno <= 36", (err, rows, fields) => {
        if (err)
            console.log(err)
        //console.log(rows)
        res.send(rows)
    })
}