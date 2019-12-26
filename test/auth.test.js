const chai = require('chai');
const chaiHttp = require('chai-http');
// const { User } = require('../database/model/User');


chai.use(chaiHttp);

const URL = "http://localhost:3000"


describe("Good Credentials while Login and signup ", () => {
    it("Should Create User Account", (done) => {
        chai.request(URL)
            .post('/signup')
            .send({
                "name": "Ranjit",
                "email": "newuser@gmail.com",
                "password": "kathmandu"
            })
            .end(function (err, res) {
                if (res) {
                    res.should.have.status(200)
                    res.should.be.json;
                    res.body.should.be.a('object');

                    done();
                }

            })
    })

    it("Login User", (done) => {
        chai.request(URL)
            .post('/login')
            .send({
                "email": "newuser@gmail.com",
                "password": "kathmandu"
            })
            .end(function (err, res) {
                if (res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.should.be.a('object');

                    done();
                }
            })
    })
})

describe('Wrong credentials while Login and Signup', () => {
    it("Should Return Status Code of 400 because of Incorrect Email Address and Short Password ", (done) => {
        chai.request(URL)
            .post('/signup')
            .send({
                "name": "Ranjit",
                "email": "ranjitudigmail.com",
                "password": "kath"
            })
            .end(function (err, res) {
                if (res) {
                    res.should.have.status(400)
                    res.should.be.json;
                    res.body.should.be.a('object');

                    done();
                }

            })
    })

    it("Should return status code of 400 because of Wrong Login credentials", (done) => {
        chai.request(URL)
            .post('/login')
            .send({
                "email": "ranjitudgmail.com",
                "password": "jjj"
            })
            .end(function (err, res) {
                if (res) {
                    res.should.have.status(400);
                    res.should.be.json;
                    res.should.be.a('object');

                    done();
                }
            })
    })
})
