const NewsmanRepository = require('../repository/sequelize/NewsmanRepository');

exports.getNewsmans = (req, res, next) => {
    NewsmanRepository.getNewsmans()
        .then(cats => {
            res.status(200).json(cats);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getNewsmanById = (req, res, next) => {
    const newsmanID = req.params.newsmanID;
    NewsmanRepository.getNewsmanById(newsmanID)
        .then(cats => {
            if (!cats) {
                res.status(404).json({
                    message: 'Category with id: ' + newsmanID + ' not found'
                })
            } else {
                res.status(200).json(cats);
            }
        });
};

exports.createNewsman = (req, res, next) => {
    NewsmanRepository.createNewsman(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateNewsman = (req, res, next) => {
    const newsmanID = req.params.newsmanID;
    NewsmanRepository.updateNewsman(newsmanID, req.body)
        .then(result => {
            res.status(200).json({ message: 'Newsman updated!', Newsman: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteNewsman= (req, res, next) => {
    const newsmanID = req.params.newsmanID;
    NewsmanRepository.deleteNewsman(newsmanID)
        .then(result => {
            res.status(200).json({ message: 'Removed Newsman', Newsman: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};