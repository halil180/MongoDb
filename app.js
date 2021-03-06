const express = require('express')
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