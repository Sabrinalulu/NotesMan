var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// const db = require("./model");
const apiRoute = require("./routes/note-routes");
app.use('/api', apiRoute);

app.get('/', (req,res) => {
    res.json({ message: 'Welcome to NotesMan app. This is a simple route.'});
});

const dbinit = require("./database/db");
const err = require("express");
dbinit.sequelize.sync().then(() => {
    app.listen(port, function () {
        console.log(`The server (db) is running on port ${port}`);
    });
})
    .catch(err => console.log(err));
