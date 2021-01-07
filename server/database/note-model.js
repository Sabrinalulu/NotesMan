// const sequelize = require("sequelize");
// const db = require("../database/db.js");
// const { Sequelize } = require("../database/db.js");

module.exports = (sequelize, Sequelize) => {
    const noteFormat = sequelize.define('note', {

        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        sub: {
            type: Sequelize.INTEGER,
        },
        title: {
            type: Sequelize.STRING
        },
        body: {
            type: Sequelize.STRING
        },
    },
    {
        timestamps: false
    });

    return noteFormat;
};

// module.exports = db.sequelize.define('note',
//     {

//         id: {
//             type: Sequelize.INTEGER,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         sub: {
//             type: Sequelize.STRING
//         },
//         title: {
//             type: Sequelize.STRING
//         },
//         content: {
//             type: Sequelize.STRING
//         },
//         created: {
//             type: Sequelize.DATE,
//             defaultValue: Sequelize.NOW
//         }
//     },
//     {
//         timestamps: false
//     }
// )