const dataStore = require('nedb')
const bodyParser = require("body-parser");
const express = require('express')
const app = express();
const path = require('path')
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'))

var db = {}
db.posts = new dataStore({
    autoload: true,
    filename: 'db'
})
db.comments = new dataStore({
    autoload: true
})

app.post('/posts', (req, res) => {

       let title = req.body.title;
       let content = req.body.content;
  

    //console.log(req.body)

    db.posts.insert({title: title, content: content}, (err, newdoc) => {
        res.send(newdoc)
    })
})


app.get('/', (req, res) => {
    res.sendFile(path.resolve('../index.html'))
})

app.get('/posts', (req, res) => {
    db.posts.find({}, function (err, doc) {
        res.send(doc)
    })
})
app.put('/posts/:id', (req, res) => {
    let id = req.params.id;
    let title = req.body.title;
    let content = req.body.content;

    let result = update(id, title, content)

    res.sendFile(result)
})




function post(title, content) {
    db.posts.insert({title: title, content: content}, (err, newdoc) => {
        return newdoc
    })
}

function update(id, title, content) {
    db.posts.update({_id: id},{$set: {title: title, content: content}}, {}, (err, newdoc) => {
        return newdoc
    })
}

app.listen(3000, () => {
    console.log('listening to port 3000')
})
 