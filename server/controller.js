const db = require("./database/db");
const NOTES = db.notes;
// const Op = db.Sequelize.Op;
// const today = new Date();

// Create and save a new note
exports.create = (req,res) => {

    // validate request
    if(!req.body.title){
        res.status(400).send({
            message: "Content can't be empty!"
        });
        return
    }

    // create a note
    const noteobj = {
        sub: req.body.sub,
        title: req.body.title,
        body: req.body.body,
    }

    // save the note into the database
    NOTES.create(noteobj)
    .then( data => {
        res.send(data);
    })
    .catch( err => {
        res.status(500).send({
            message:
            err.message || "Some errors occurred while saving the note."
        });
    });

};

// Retrieve all notes from the database
exports.findAll = (req,res) => {
    
    NOTES.findAll()
    .then( data => {
        res.send(data);
    })
    .catch( err => {
        res.status(500).send({
            message:
            err.message || "Some errors occurred while retrieving notes."
        });
    });
};

exports.findOne = (req,res) => {
    var id = parseInt(req.params.id);
    
    NOTES.findByPk(id)
    .then( data => {
        res.send(data);
    })
    .catch( err => {
        res.status(500).send({
            message:
            err.message || "Some errors occurred while retrieving notes."
        });
    });
};

exports.update = (req, res) => {
    var id = parseInt(req.params.id);

    NOTES.update( req.body, {
        where: {
            id: id
        }
    })
    .then( num => {
        if(num == 1){
            res.send({
                message: 'The note was updated successfully.'
            });
        }else{
            res.send({
                message: 'Cannot update note with id: '+id+ '. Maybe note was not found or the req.body is empty.'
            });
        }
    })
    .catch( err => {
        res.status(500).send({
            message:
            "Cannot update note with id: "+id
        });
    });
};

exports.delete = (req,res) => {
    var id = parseInt(req.params.id);

    NOTES.destroy({
        where:{
            id : id
        }
    }).then( num => {
        if(num == 1){
            res.send({
                message: 'The note was deleted successfully.'
            });
        }else{
            res.send({
                message: 'Cannot delete note with id: '+id+ '. Maybe note was not found.'
            });
        }
    })
    .catch( err => {
        res.status(500).send({
            message:
            "Cannot delete note with id: "+id
        });
    });
};
