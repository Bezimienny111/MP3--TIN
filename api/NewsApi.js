const NewsRepository = require('../repository/sequelize/NewsRepository');

exports.getNews = (req, res, next) => {
    NewsRepository.getNews()
        .then(cats => {
            res.status(200).json(cats);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getNewsByID = (req, res, next) => {
    const newsID = req.params.newsId;
    NewsRepository.getNewsByID(newsID)
        .then(cats => {
            if (!cats) {
                res.status(404).json({
                    message: 'News with id: ' + newsID + ' not found'
                })
            } else {
                res.status(200).json(cats);
            }
        });
};

exports.createNews = (req, res, next) => {
    NewsRepository.createNews(req.body)
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

exports.updateNews = (req, res, next) => {
    const newsID = req.params.newId;
    console.log(req.params.newId);
    NewsRepository.updateNews(newsID, req.body)
        .then(result => {
            res.status(200).json({ message: 'News updated!', News: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteNews= (req, res, next) => {
    const newsID = req.params.newsId;
    NewsRepository.deleteNews(newsID)
        .then(result => {
            res.status(200).json({ message: 'Removed News', News: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};