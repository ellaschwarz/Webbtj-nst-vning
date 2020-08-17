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