const Sequelize = require("sequelize");
const db = {};
const sequelize = new Sequelize('notesMan', 'root', '903370618', {

    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

db.notes = require('./note-model.js')(sequelize, Sequelize);
    
module.exports = db;