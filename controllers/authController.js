const newsmanRepository = require('../repository/sequelize/NewsmanRepository');
const authUtil = require('../utils/authUtils');

exports.login = (req, res, next) => {
    const nick = req.body.Nick;
    const password = req.body.password;
    console.log(password);
    newsmanRepository.findByNick(nick)
        .then(man => {
            if(!man) {
                res.render('index', {
                    navLocation: '',
                    loginError: "Nieprawidłowy nick"
                })
            } else if(authUtil.comparePasswords(password, man.password) === true) {
              //  else if(man.password === password){
                req.session.loggedUser = man;
                res.redirect('/');
            } else {
                res.render('index', {
                    navLocation: '',
                    loginError: "Nieprawidłowe hasło"
                })
            }
        })
        .catch(err => {
            console.log(err);
        });

}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect('/');
}