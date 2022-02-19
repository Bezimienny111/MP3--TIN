const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const News = sequelize.define('News', {
    ID_news: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    Category_ID_Category: {
        type: Sequelize.INTEGER,
        allowNull: false,
        min: 1,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
        }
    },
    Newsman_ID_Newsman: {
        type: Sequelize.INTEGER,
        allowNull: false,
        min: 1,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
        }
    },
    Content: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [1, 300],
                msg: "Pole powinno zawierać od 1 do 300 znaków"
            },
        }
    },
    /*_Date: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
           notEmpty: {
                msg: "Pole jest wymagane"
            },
      //      len: {
     //           args: [1, 10],
      //          msg: "Pole powinno zawiera� dat� w formacie RRRR-MM-DD"
     //       },
        }
    },*/
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
                msg: 'Data nie mozę być z przyszłości'
            }
        }
    },
    Dodatkowe_linki: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            len: {
                args: [0, 100],
                msg: "Pole powinno zawierać od 0 do 100 znaków"
            },
        }
    }
});

module.exports = News;