const dataStore = require('nedb')
const bodyParser = require("body-parser");
const express = require('express')
const app = express();
const path = require('path')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'))

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

function findAll() {
    db.posts.find({}, function (err, doc) {
        return doc
    })
}

app.post('/post', (req, res) => {
    let title = req.params.title;
    let content = req.params.content;

    post(title, content)
})

app.get('/', (req, res) => {
    res.sendFile(path.resolve('../index.html'))
})

app.listen(3000, () => {
    console.log('listening to port 3000')
})
