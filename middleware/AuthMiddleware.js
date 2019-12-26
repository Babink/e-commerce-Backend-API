const { User } = require('../database/model/User');

const myMiddleware = (req , res , next) => {
    const token = req.header('x-auth');
    console.log("FROM SERVER MIDDLEWARE" , token);

    User.findByToken(token).then((user) => {
        if(!user){
            return Promise.reject();
        }

        req.user = user;
        req.token = token;

        next();
    }).catch((e) => {
        res.status(401).send(e);
    })
}

module.exports = { myMiddleware };