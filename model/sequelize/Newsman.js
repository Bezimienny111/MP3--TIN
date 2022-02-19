const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Newsman = sequelize.define('Newsman', {
    ID_Newsman: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Nick: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "Pole wymagane"
            },
            len: {
                args: [2, 50],
                msg: "Pole powinno zawierać od 2 do 20 znaków"
            },
        }
    },
    Email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2, 50],
                msg: "Pole powinno zawierać od 1 do 69 znaków"
            },
            isEmail: {
                msg: "Pole powinno zawierać prawidłowy email"
            }
        }
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2, 50],
                msg: "Pole powinno zawierać od 2 do 30 znaków"
            },
        }
    },
    Surname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2, 50],
                msg: "Pole powinno zawierać od 2 do 30 znaków"
            },
        }
    },
    Salary_per_news: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isNumeric: {
                args: true,
                msg: "Musi być liczba"
            },
            min: {
                 args: 1,
                 msg: "Nie moze byc mniej niz 1"
                },
            max:{
                 args: 20,
                msg: "Nie moze byc wieciej niz 20"
              }


           }
    },
    Admin: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isNumeric: {
                args: true,
                msg: "Musi być liczba"
            },
           // min: {
           //     args: -1,
          //      msg: "Nie moze byc mniej niz 1"
          //     },
         //  max:{
           //     args: 1,
           //    msg: "Nie moze byc wieciej niz 20"
            // },
             isIn: {
                 args: [[1, 0]],
                 msg: "1 - admin, 0 - user"
           }
        }
    }
});

module.exports = Newsman;

