const { FeedBack } = require('../database/model/feedback');
const { myMiddleware } = require('../middleware/AuthMiddleware')

module.exports = (app) => {
    app.get('/feedback' , (req , res) => {
        FeedBack.find().then((feedback) => {
            if(!feedback){
                res.send({ success: false , message: "No Feedback Available" })
            }

            res.send(feedback)
        }).catch((e) => {
            res.status(400).send(e);
        })
    })

    app.post('/feedback' , myMiddleware , (req , res) => {
        const { name , email , subject , message } = req.body;

        if(name && email && subject && message){
            const toSave = new FeedBack({
                name,
                email,
                subject,
                message,
                _creator: req.user._id
            })

            toSave.save().then((docs) => {
                res.send(docs);
            }).catch((e) => {
                res.status(400).send(e);
            })
        }
    })
}