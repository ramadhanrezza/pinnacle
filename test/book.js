process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
let server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('/GET book', () => {
    it('it should GET all the books', (done) => {
        chai.request(server)
        .get('/books')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('error').eq(false);
            res.body.should.have.property('data');
            done();
        });
    });
});

describe('/GET book ID', () => {
    it('it should GET books detail by id', (done) => {
        const book_id = 11223344
        chai.request(server)
        .get('/books/' + book_id)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('error').eq(false);
            res.body.should.have.property('data');
            done();
        });
    });
});

describe('/POST book without book detail', () => {
    it('it sould failed to post the book info', (done) => {
        chai.request(server)
        .post('/books')
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error').eq(true);
            done();
        });
    });
});

describe('/POST book', () => {
    it('it sould post the book info', (done) => {
        const book = {
            id: 3,
            title: "Input ffrom test",
            author: "authors",
            publishedOn: 2017,
            numberOfPages: 200
        };
        chai.request(server)
        .post('/books')
        .send({book: book})
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.should.have.property('error').eq(false);
            done();
        });
    });
});

describe('/PUT book without book detail and book_id', () => {
    it('it sould failed to update the book info', (done) => {
        const book = {};
        const book_id = 11223347
        chai.request(server)
        .put('/books')
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error').eq(true);
            done();
        });
    });
});

describe('/PUT book without book detail', () => {
    it('it sould failed to update the book info', (done) => {
        const book_id = 11223347
        chai.request(server)
        .put('/books')
        .send({
            book_id: book_id
        })
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error').eq(true);
            done();
        });
    });
});

describe('/PUT book without book_id', () => {
    it('it sould failed to update the book info', (done) => {
        const book = {
            id: 3,
            title: "Input ffrom test",
            author: "authors",
            publishedOn: 2017,
            numberOfPages: 200
        };
        chai.request(server)
        .put('/books')
        .send({
            book: book
        })
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error').eq(true);
            done();
        });
    });
});

describe('/PUT book', () => {
    it('it sould update the book info', (done) => {
        const book = {
            title: "Input ffrom test",
            author: "authors",
            publishedOn: 2017,
            numberOfPages: 200
        };
        const book_id = 11223347
        chai.request(server)
        .put('/books')
        .send({
            book_id: book_id,
            book: book
        })
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.should.have.property('error').eq(false);
            done();
        });
    });
});

describe('/DELETE book', () => {
    it('it sould delete the book info', (done) => {
        const book_id = 3
        chai.request(server)
        .delete('/books')
        .send({ book_id: book_id })
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.should.have.property('error').eq(false);
            done();
        });
    });
});

describe('/DELETE book without book_id', () => {
    it('it sould delete the book info', (done) => {
        chai.request(server)
        .delete('/books')
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error').eq(true);
            done();
        });
    });
});
