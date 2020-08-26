const express = require('express')
const app = express();
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const passport = require('passport');
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

/*
Lägg tillbaks detta snart
*/
const userRoutes = require('./routes/user-routes.js');
app.use(userRoutes);

const commentsRoutes = require('./routes/comments-route.js');
app.use(commentsRoutes);

app.listen(3000, () => {
    console.log('Server started on port 3000')
})
