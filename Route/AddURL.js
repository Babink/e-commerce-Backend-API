const { Urls } = require('../database/model/urls');

module.exports = (app) => {
    app.get('/admin/add' , (req , res) => {
        Urls.find().then((docs) => {
            res.send(docs);
        } , (e) => {
            res.status(401).send(e);
        })
    })

    app.post('/admin/add' , (req ,res) => {
        const { url , item , price , description } = req.body;

        if(url && item && price && description){
            const toSave = new Urls({
                url: url,
                item: item,
                price: price,
                description: description
            })

            toSave.save().then((docs) => {
                res.send(docs);
            } , (e) => {
                res.status(401).send(e);
            })
        }
    })
}