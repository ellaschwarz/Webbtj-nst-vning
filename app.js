const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const dataBase = require('nedb');
const path = require('path')
const db = {} 
db.posts = new dataBase({
    autoload: true,
    filename: 'posts'
})
db.comments = new dataBase({
    autoload: true,
    filename: 'comments'
})

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname})
})

app.post('/posts', (req, res) => {
    console.log(req.body)
    let title = req.body.title;
    let content = req.body.content;
    
    db.posts.insert({title: title, content: content}, (err, docs) => {
        res.send(docs)
    })
})
app.get('/posts', (req, res) => {
    db.posts.find({}, (err, docs) => {
        res.send(docs)
    })
})
app.get('/posts/:id', (req, res) => {
    db.posts.find({_id: req.params.id}, (err, docs) => {
        res.send(docs)
    })
})
app.put('/posts/:id', (req, res) => {
    let id = req.params.id
    console.log(req.params)
    let title = req.body.title
    let content = req.body.content

    db.posts.update({_id: id}, {$set: {title: title, content: content}}, (err, docs) => {
        if(docs == 1) {
            res.sendStatus(200)
        } else {
            res.sendStatus(400)
        }
    })
})
app.delete('/posts/:id', (req, res) => {
    db.posts.remove({_id: req.params.id}, {}, (err, docs) => {
        if(docs == 1) {
            res.sendStatus(200)
        } else {
            res.sendStatus(400)
        }
    })
})

app.get('/comments', (req, res) => {
    db.comments.find({}, (err, docs) => {
        res.send(docs)
    })
})
app.post('/comments', (req, res) => {
    
    db.comments.insert({user: req.body.user, comment: req.body.comment, post: req.body.post}, (err, docs) => {
        res.send(docs)
    })
})
app.get('/comments/:id', (req, res) => {
    db.comments.find({_id: req.params.id}, (err, docs) => {
        res.send(docs)
    })
})
app.put('/comments/:id', (req, res) => {
    db.comments.update({_id: req.params.id}, {user: req.body.user, comment: req.body.comment, post: req.body.post}, (err, docs) => {
        if(docs == 1) {
            res.sendStatus(200)
        } else {
            res.sendStatus(400)
        }
    })
})
app.delete('/comments/:id', (req, res) => {
    db.comments.remove({_id: req.params.id}, {}, (err, docs) => {
        if(docs == 1) {
            res.sendStatus(200)
        } else {
            res.sendStatus(400)
        }
    })
})

app.get('/fullpost/:id', (req, res) => {
    db.posts.find({_id: req.params.id}, (err, docs) => {
        if(docs) {
            db.comments.find({post: req.params.id}, (error, moredocs) => {
                for(let row in moredocs) {
                    docs.push(moredocs[row])
                }
                res.send(docs)
            })
        }
    })
})


app.listen(3000, () => {
    console.log('Server started on port 3000')
})