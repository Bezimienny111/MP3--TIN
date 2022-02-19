const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Category = sequelize.define('Category', {
    ID_Category: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },

    Description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2, 50],
                msg: "Pole powinno zawieraÄ‡ od 2 do 50 znakÃ³w"
            },
        }
    },
  /*  _Date: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Nie mo¿e byæ puste'
            },
            isBefore: {
                args: [new Date().toISOString().split("T")[0]],
                msg: 'Data nie mo¿e byæ z przysz³oœci'
            }
            

        }
    }

*/
    _Date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [10, 10],
                msg: "Podaj date w poprawnym formacie"
            },
             isBefore: {
                args: [new Date().toISOString().split("T")[0]],
                msg: 'Data nie moÅ¼e byÄ‡ z przyszÅ‚oÅ›ci'
            }
        }
    },
});

module.exports = Category;