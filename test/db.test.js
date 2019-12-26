const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

const URL = 'http://localhost:3000';

describe("Testing of Feedback and Purchase", () => {
    it("Should Add Feedback data in database", (done) => {
        const Feedback = {
            "name": "Ranjit",
            "email": "ranjitudin17@gmail.com",
            "subject": "Quality Dress",
            "message": "Product quality is great , Thank you"
        }
        chai.request(URL)
            .post('/feedback')
            .send(Feedback)
            .set({ "x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2Q5ODIzMzcwNDZmNjRmYTQ4YjFhNDkiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTU3NzU5MDc0fQ.V6IVwgjoFVgrKWAKu-_V0XHk-GCfSP_yctlxcji2ebQ" })
            .end(function (err, res) {
                if (res) {
                    res.should.have.status(200)
                    done();
                }
            })
    })

    it("Should Add Purchase data in database ", (done) => {
        const Purchase = {
            "size": "xl",
            "color": "green",
            "quantity": "3",
            "address": "Kapan",
            "contact": "9845796930",
            "product_url": "https://i.ibb.co/RNWxPJy/7th.jpg"
        };

        chai.request(URL)
            .post('/buy')
            .send(Purchase)
            .set({ "x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2Q5ODIzMzcwNDZmNjRmYTQ4YjFhNDkiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTU3NzU5MDc0fQ.V6IVwgjoFVgrKWAKu-_V0XHk-GCfSP_yctlxcji2ebQ" })
            .end(function (err, res) {
                if (res) {
                    res.should.have.status(200)
                    done();
                }
            })
    })
})

describe("Feedback and Purchase Without Authenticating User", () => {
    it("Expected to get 401 Unauthorized response from server (Feedback)", (done) => {
        const Feedback = {
            "name": "Ranjit",
            "email": "ranjitudin17@gmail.com",
            "subject": "Quality Dress",
            "message": "Product quality is great , Thank you"
        }
        chai.request(URL)
            .post('/feedback')
            .send(Feedback)
            // .set({ "x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2Q5ODIzMzcwNDZmNjRmYTQ4YjFhNDkiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTU3NzU5MDc0fQ.V6IVwgjoFVgrKWAKu-_V0XHk-GCfSP_yctlxcji2ebQ" })
            .end(function (err, res) {
                if (res) {
                    res.should.have.status(401)
                    done();
                }
            })
    })

    it("Expected to get 401 Unauthorized response from server (Purchase)", (done) => {
        const Purchase = {
            "size": "xl",
            "color": "green",
            "quantity": "3",
            "address": "Kapan",
            "contact": "9845796930",
            "product_url": "https://i.ibb.co/RNWxPJy/7th.jpg"
        };

        chai.request(URL)
            .post('/buy')
            .send(Purchase)
            // .set({ "x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2Q5ODIzMzcwNDZmNjRmYTQ4YjFhNDkiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTU3NzU5MDc0fQ.V6IVwgjoFVgrKWAKu-_V0XHk-GCfSP_yctlxcji2ebQ" })
            .end(function (err, res) {
                if (res) {
                    res.should.have.status(401)
                    done();
                }
            })
    })
})