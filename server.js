var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


// connection configurations
var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'pnc'
});

// connect to database
dbConn.connect();


// Retrieve all books
app.get('/books', function (req, res) {
    dbConn.query('SELECT * FROM Books', function (error, results, fields) {
        return res.send({ error: false, data: results, message: 'books list.' });
    });
});


// Retrieve books with id
app.get('/books/:id', function (req, res) {

    let book_id = req.params.id;

    dbConn.query('SELECT * FROM Books where id=?', book_id, function (error, results, fields) {
        return res.send({ error: false, data: results[0], message: 'books list.' });
    });

});


// Add a new book
app.post('/books', function (req, res) {

    let book = req.body.book;

    if (!book) {
        return res.status(400).send({ error:true, message: 'Please provide book' });
    }

    dbConn.query("INSERT INTO Books SET ? ", [book], function (error, results, fields) {
        return res.send({ error: false, data: results, message: 'New book has been created successfully.' });
    });
});


//  Update book with id
app.put('/books', function (req, res) {

    let book_id = req.body.book_id;
    let book = req.body.book;

    if (!book_id || !book) {
        return res.status(400).send({ error: true, message: 'Please provide book and book_id' });
    }

    dbConn.query("UPDATE Books SET ? WHERE id = ?", [book, book_id], function (error, results, fields) {
        return res.send({ error: false, data: results, message: 'Book has been updated successfully.' });
    });
});


//  Delete book
app.delete('/books', function (req, res) {

    let book_id = req.body.book_id;

    if (!book_id) {
        return res.status(400).send({ error: true, message: 'Please provide book_id' });
    }
    dbConn.query('DELETE FROM Books WHERE id = ?', [book_id], function (error, results, fields) {
        return res.send({ error: false, data: results, message: 'Book has been updated successfully.' });
    });
});

// set port
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});

module.exports = app;
