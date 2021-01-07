const express = require('express');
const router = express.Router();
const notes = require('../controller');
const db = require('../database/note-model');

// create a new note
router.post('/new-a-note', notes.create);
// retrieve all notes
router.get('/find-all', notes.findAll);
// retrieve the note by id
router.get('/selected/:id', notes.findOne);

// update a single note with id
router.put("/update/:id", notes.update);
// delete a single note with id
router.delete("/delete/:id", notes.delete);

module.exports = router;

// module.exports = app => {

//     const notes = require("../controller.js");

//     // var router = require("express").Router();

//     // create a new note
//     router.post("../../src/app/page/notes-detail", notes.create);

//     // retrieve all notes
//     router.get("../../src/app/page/notes-list", notes.findAll);

//     // retrieve a single note with id
//     router.get("../../src/app/page/notes-detail/:id", notes.findOne);

//     // update a single note with id
//     router.put("../../src/app/page/notes-detail/:id", notes.update);

//     // delete a single note with id
//     router.delete("../../src/app/page/notes-detail/:id", notes.delete);

//     app.use('../../src/app/page/storage', router);
// }