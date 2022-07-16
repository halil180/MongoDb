const express = require('express')
const {ObjectId} = require('mongodb')
const {connectToDb,getDb} = require('./db')
//init app && middleware

const app = express()

//db connection
let db 
connectToDb((err) => {
if (!err) {
    app.listen(3010,() => {
        console.log('App listening on port 3010')
    })
    db = getDb()
}
})


///routes
app.get('/books',(req,res)=> {
    let books = []
    db.collection('books')
    .find()
    .sort({author:1})
    .forEach(book => books.push(book))
    .then(() => {
        res.status(200).json(books)
    })
    .catch(() => {
        res.status(500).json({error:'Could not fetch the documents'})
    })
    ///cursor toArray forEach 
 
    // res.json({mssg:'welcome to the api'})
})

app.get('/books/:id',(req,res) => {
    //  req.params.id
    if (ObjectId.isValid(req.params.id)) {
        db.collection('books')
        .findOne({_id:ObjectId(req.params.id)})
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json({error:'could not fetch the document'})
        })
    }else{
        res.status(500).json({error:'Not valid cod id'})
    }
})