const { Purchase } = require('../database/model/Purchase');
const { myMiddleware } = require('../middleware/AuthMiddleware');
const { AdminModel } = require('../database/model/Admin');

module.exports = (app) => {
    app.get('/buy', myMiddleware , (req, res) => {
        const myToken = req.header('x-auth') || "false";
        console.log(myToken , "FROM BUY ROUTE" , req.token)
        Purchase.find({ _creator: req.user._id }).then((docs) => {
            if(!docs){
                res.status(401).send("NO PURCHASE RECORD FOUND");
            }

            res.send(docs);
        })
    })

    app.post('/buy', myMiddleware , (req, res) => {
        const { size, color, quantity, address, contact , product_url } = req.body;

        if (size && color && quantity && address && contact && product_url) {
            const toSave = new Purchase({
                size,
                color,
                quantity,
                address,
                contact,
                product_url,
                _creator: req.user._id
            });

            toSave.save().then((docs) => {
                res.send(docs);
            } , (e) => {
                res.status(400).send("Unable to save data");
            })
        }
    })

    app.post('/admin' , myMiddleware , (req , res) => {
        const { imageURL , product_id , sold } = req.body;

        if(imageURL && product_id){
            const toSave = new AdminModel({
                imageURL,
                product_id,
                sold,
                _creator: req.user._id
            })

            toSave.save().then((docs) => {
                res.send(docs);
            }).catch((e) => {
                res.status(401).send(e)
            })
        }
    })

    app.get('/admin' , myMiddleware , (req , res) => {
        AdminModel.find().then((docs) => {
            res.send(docs);
        })
    })


    app.get('/admin/get' , (req , res) => {
        Purchase.find().then((docs) => {
            if(!docs){
                res.send({ success: true , message: "No data avaiable" })
            }

            res.send(docs);
        }).catch((e) => {
            res.status(400).send(e);
        })
    })
}