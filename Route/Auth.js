const { User } = require('../database/model/User');
const { myMiddleware } = require('../middleware/AuthMiddleware');

module.exports = (app) => {
    app.get('/me' , myMiddleware  , (req , res) => {
        res.send(req.user);
    })

    app.post('/signup' ,(req, res) => {
        const { name , email , password } = req.body;

        if(name && email && password){
            const toSave = new User({
                name,   
                email,
                password
            })

            toSave.save().then(() => {
                return toSave.generateToken();
            }).then((token) => {
                res.header('x-auth' , token).status(200).send(toSave);
                // res.cookie("x-auth" , token , { domain: "http://localhost:3000" , path: '/signup' , secure: true , expires: new Date(Date.now() + 900000) , httpOnly: false  }).send(toSave); 
                console.log("COOKIE IS SET")
            }).catch((e) => {
                res.status(400).send(e)
            })
        }
    })

    app.post('/login' , (req , res) => {
        const { email , password } = req.body;

        User.findByCred(email , password).then((user) => {
            return user.generateToken().then((token) => {
                // res.cookie("x-auth" , token , { domain: "http://localhost:3000" , path: '/login' , secure: true , expires: new Date(Date.now() + 900000) , httpOnly: false }).send(user)
                res.header('x-auth' , token).send(user);
            }).catch((e) => {
                res.status(401).send(e)
            })
        })

    })


    app.delete('/logout' , myMiddleware , (req , res) => {
        req.user.removeToken(req.token).then(() => {
            res.status(200).send();
        } , () => {
            res.status(400).send();
        })
    })

    app.get('/admin/users' , (req , res) => {
        User.find().then((docs) => {
            if(!docs){
                res.send({ success: false , message: "No user found" })
            }

            res.send(docs)
        }).catch((e) => {
            res.status(400).send(e);
        })
    })
}