const NewsmanRepository = require('../repository/sequelize/NewsmanRepository');



exports.showNewsmanList = (req, res, next) => {
    NewsmanRepository.getNewsmans().then(newsmani => {
        res.render('pages/Newsman/list', {
            newsman: newsmani,
            navLocation: 'man'
        });
    });
}

//exports.showNewsmanList = (req, res, next) => {
//	res.render('pages/Newsman/list', { navLocation: 'man' });
//}

exports.showAddNewsmanForm = (req, res, next) => {
    res.render('pages/Newsman/form', {
        newsman: {},
        pageTitle:  req.__('man.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('man.form.add.btnLabel'),
        formAction: '/newsman/add',
        navLocation: 'man',
        validationErrors: []
    });
}

exports.showEditNewsmanForm = (req, res, next) => {
    const manID = req.params.manId;
    NewsmanRepository.getNewsmanById(manID)
        .then(mans => {
            res.render('pages/Newsman/form', {
                newsman: mans,
                formMode: 'edit',
                pageTitle: req.__('man.form.edit.pageTitle'),
                btnLabel: req.__('man.form.edit.btnLabel'),
                formAction: '/newsman/edit',
                navLocation: 'man',
                validationErrors: []
            });
        });
};

exports.showNewsmanDetails = (req, res, next) => {
    const manID = req.params.manId;
    NewsmanRepository.getNewsmanById(manID)
        .then(mans => {
            res.render('pages/Newsman/form', {
                newsman: mans,
                formMode: 'showDetails',
                pageTitle: req.__('man.form.mandet'),
                formAction: '',
                navLocation: 'man',
                validationErrors: []
            });
        });
    
}

exports.addNewsman = (req, res, next) => {
    const manData = { ...req.body };
  //  console.log("-------------------------");
  //  console.log(JSON.stringify(manData));
 //   console.log("-------------------------");
    NewsmanRepository.createNewsman(manData)
        .then(result => {
            res.redirect('/newsman');
        }).catch(err => {
            err.errors.forEach(e => {
                if (e.path.includes('Email') && e.type == 'unique violation') {
                    e.message = "Podany email już zarejestrowany";
                }else if (e.path.includes('Nick') && e.type == 'unique violation') {
                    e.message = "Podany nick już zarejestrowany";
               }
            });
            res.render('pages/Newsman/form', {
                
                newsman: manData,
                formMode: 'createNew',
                pageTitle: req.__('man.form.add.pageTitle'),
                btnLabel: req.__('man.form.add.btnLabel'),
                formAction: '/newsman/add',
                navLocation: 'man',
                validationErrors: err.errors


            });

          
        });
};

exports.updateNewsman = (req, res, next) => {
    const manId = req.body.ID_Newsman;
    const manData = { ...req.body };
    NewsmanRepository.updateNewsman(manId, manData)
        .then(result => {
            res.redirect('/newsman');
        }).catch(err => {
            err.errors.forEach(e => {
                console.log(JSON.stringify(e));
                if (e.path.includes('Email') && e.type == 'unique violation') {
                    e.message = "Podany email już zarejestrowany";
                }
                if (e.path.includes('Nick') && e.type == 'unique violation') {
                   e.message = "Podany nick już zarejestrowany";
                }
            });

            res.render('pages/Newsman/form', {
                newsman: manData,
                formMode:'edit',
                pageTitle: req.__('man.form.edit.pageTitle'),
                btnLabel:  req.__('man.form.edit.btnLabel'),
                formAction: '/newsman/edit',
                navLocation: 'man',
                validationErrors: err.errors
            });
        });
};

exports.deleteNewsman = (req, res, next) => {
    const manId = req.params.manId;
    NewsmanRepository.deleteNewsman(manId)
        .then(() => {
            res.redirect('/newsman');
        });
};



//exports.showNewsmanForm = (req, res, next) => {
//	res.render('pages/Newsman/form', { navLocation: 'man' });
//}
//exports.showNewsmanDetails = (req, res, next) => {
//	res.render('pages/Newsman/list-every', { navLocation: 'man' });
//}