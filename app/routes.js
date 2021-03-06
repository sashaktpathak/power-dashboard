var mysql = require('mysql')
var dbconfig = require('../config/database')
var connection = mysql.createConnection(dbconfig.connection)
var express = require('express')
var path = require('path')
var mime = require('mime')
var bcrypt = require('bcrypt-nodejs')
var fs = require('fs')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'out.csv',
    header: [
        { id: 'chno', title: 'Channel No' },
        { id: 'timestamp', title: 'Time Stamp' },
        { id: 'status', title: 'Status' },
        { id: 'label', title: 'Label' },
        { id: 'location', title: 'Location' },
    ]
});
module.exports = function (app, passport) {
    /*app.get('/', function (req, res) {
        res.render('index.ejs')
    })*/
    app.get('/login', function (req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') })
    })
    app.get('/admin', isadminLoggedIn, function (req, res) {
        res.render('admin')
    })

    app.post('/login', passport.authenticate('local-login', {
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
            if (req.user.type == 1)
                res.redirect('/')
            else
                res.redirect('/admin?id=' + req.user.id)
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
    app.post('/adduser', function (req, res) {
        connection.query('SELECT * FROM users where username = ?',
            [req.body.username], function (err, rows) {
                if (err)
                    console.log(err)
                if (rows.length) {
                    console.log("length error!")
                }
                else {
                    var newUserMysql = {
                        username: req.body.username,
                        password: bcrypt.hashSync(req.body.password, null, null)

                    }
                    var u_type = 1;
                    console.log('--=--=', req.body.type)
                    if (req.body.type == 'true') {
                        u_type = 0
                        console.log("sfds")
                    }
                    var insertQuery = "INSERT INTO users(username, password, type) VALUES(?, ?, ?)"
                    connection.query(insertQuery, [newUserMysql.username, newUserMysql.password, u_type],
                        (err, rows) => {
                            newUserMysql.id = rows.insertId;
                            res.send("Success")
                        })
                }
            })
    })

    let reqPath = path.join(__dirname, '../')
    app.get('/', isLoggedIn, function (req, res) {
        res.render('home', { name: req.user.username })
    })

    //app.use('/home', express.static(reqPath + 'public_static'))

    app.get('/logout', function (req, res) {
        req.logout()
        res.redirect('/login')
    })

    app.post('/getData1', function (req, res) {
        getData1(req.body.loc, res)
    })

    app.post('/getData2', function (req, res) {
        getData2(req.body.loc, res)
    })

    app.post('/getData3', function (req, res) {
        getData3(req.body.loc, res)
    })
    app.post('/admin@allusers', function (req, res) {
        connection.query('USE ' + dbconfig.database)
        connection.query('SELECT id,username,type,active FROM users', (err, rows, fields) => {
            if (err)
                console.log(err)
            res.send(rows)
        })

    })
    app.post('/admin@deluser', function (req, res) {
        connection.query('USE ' + dbconfig.database)
        connection.query('DELETE FROM users where id = ?', [req.body.id], (err, rows, fields) => {
            if (err)
                console.log(err)
            res.send("Success")
        })

    })
    app.post('/admin@deactivate', function (req, res) {
        connection.query('USE ' + dbconfig.database)
        connection.query('UPDATE users SET active = 0 where id = ?', [req.body.id], (err, rows, fields) => {
            if (err)
                console.log(err)
            res.send("Success")
        })

    })
    app.post('/admin@activate', function (req, res) {
        connection.query('USE ' + dbconfig.database)
        connection.query('UPDATE users SET active = 1 where id = ?', [req.body.id], (err, rows, fields) => {
            if (err)
                console.log(err)
            res.send("Success")
        })

    })
    app.post('/apply_changes@password', function (req, res) {
        var npswd = bcrypt.hashSync(req.body.npwd, null, null)
        connection.query('USE ' + dbconfig.database)
        connection.query('UPDATE users SET password = ? WHERE id = ?', [npswd, req.body.id], (err, rows, fields) => {
            if (err)
                console.log(err)
            res.send("Success")
        })
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
        connection.query('UPDATE tb_status SET status = ? , timestamp = CURRENT_TIMESTAMP WHERE chno = ? and location = (SELECT id from locations l WHERE l.location = ?)', [req.body.value, req.body.rowv, req.body.loc], (err) => {

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

    app.get('/getCSV', function (req, res) {
        connection.query('USE ' + dbconfig.database)
        //console.log("==", req.query.loc, "--")
        connection.query('SELECT * FROM tb_status where location = (SELECT id from locations l WHERE l.location = ?)', [req.query.loc], (err, rows, fields) => {
            if (err) {
                console.log(err)
            }
            //console.log(rows)
            data = []
            for (i = 0; i <= 36; i++) {
                if (i == 0) {
                    b = {
                        location: req.query.loc,
                        timestamp: req.query.date + ' ' + req.query.time
                    }
                }
                else {
                    b = {
                        chno: rows[i - 1].chno,
                        status: rows[i - 1].status,
                        label: rows[i - 1].label,
                    }
                }
                data[i] = b
            }

            csvWriter
                .writeRecords(data)
                .then(() => console.log('The CSV file was written successfully'));
            let reqPath = path.join(__dirname, '../');
            const csvfile = reqPath + 'out.csv'
            var filename = path.basename(csvfile);
            var mimetype = mime.lookup(csvfile);

            res.setHeader('Content-disposition', 'attachment; filename=' + filename);
            res.setHeader('Content-type', mimetype);

            var filestream = fs.createReadStream(csvfile);
            filestream.pipe(res);
        });
    })

}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}
function isadminLoggedIn(req, res, next) {
    if (req.user.type == 0) {
        return next()
    }

    res.redirect('/')
}
function getData1(loc, res) {
    connection.query('USE ' + dbconfig.database)
    connection.query("SELECT * FROM tb_status where chno >= 1 and chno <= 24 and location = (SELECT id from locations l WHERE l.location = ?)", [loc], (err, rows, fields) => {
        if (err)
            console.log(err)
        //console.log(rows)
        res.send(rows)
    })
}
function getData2(loc, res) {
    connection.query('USE ' + dbconfig.database)
    connection.query("SELECT * FROM tb_status where chno >= 25 and chno <= 32 and location = (SELECT id from locations l WHERE l.location = ?)", [loc], (err, rows, fields) => {
        if (err)
            console.log(err)
        //console.log(rows)
        res.send(rows)
    })
}

function getData3(loc, res) {
    connection.query('USE ' + dbconfig.database)
    connection.query("SELECT * FROM tb_status where chno >= 33 and chno <= 36 and location = (SELECT id from locations l WHERE l.location = ?)", [loc], (err, rows, fields) => {
        if (err)
            console.log(err)
        //console.log(rows)
        res.send(rows)
    })
}