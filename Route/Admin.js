const { AdminAuth } = require('../database/model/Admin-Auth')

module.exports = (app) => {
    app.post('/admin/signup', (req, res) => {
        const { username, password } = req.body;

        if (username && password) {
            const toSave = new AdminAuth({
                username,
                password
            })

            toSave.save().then((admin) => {
                res.send(admin)
            }).catch((e) => {
                res.status(401).send(e)
            })
        }
    })

    app.post('/admin/login', (req, res) => {
        const { username, password } = req.body;

        if (username && password) {
            AdminAuth.findByCred(username, password).then((user) => {
                res.send(user);
            }).catch((e) => {
                res.status(401).send(e, "ERRO")
            })
        }
    })
}