const express = require('express')
const app = express();
const cors = require('cors');
const path = require('path')
/*
db.comments = new dataBase({
    autoload: true,
    filename: 'comments'
})
*/

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

//Importing route
const routes = require('./routes/routes.js');
app.use(routes);

app.listen(3000, () => {
    console.log('Server started on port 3000')
})
