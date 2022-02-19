﻿const Sequelize = require('sequelize');
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
                msg: "Pole powinno zawierać od 2 do 50 znaków"
            },
        }
    },
  /*  _Date: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Nie mo�e by� puste'
            },
            isBefore: {
                args: [new Date().toISOString().split("T")[0]],
                msg: 'Data nie mo�e by� z przysz�o�ci'
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
                msg: 'Data nie może być z przyszłości'
            }
        }
    },
});

module.exports = Category;