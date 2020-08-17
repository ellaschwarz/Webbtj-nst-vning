const dataStore = require('nedb')
const express = require('express')
const app = express()

var db = {}
db.posts = new dataStore({
    autoload: true
})
db.comments = new dataStore({
    autoload: true
})

function post(title, content) {
    db.posts.insert({title: title, content: content}, (err, newdoc) => {
        console.log(newdoc)
    })
}



app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname})
})

app.listen(3000, () => {
    console.log('listening to port 3000')
})