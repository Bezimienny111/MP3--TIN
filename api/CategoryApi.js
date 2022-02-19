const CategoryRepository = require('../repository/sequelize/CategoryRepository');

exports.getCategory = (req, res, next) => {
    CategoryRepository.getCategory()
        .then(cats => {
            res.status(200).json(cats);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getCategoryByID = (req, res, next) => {
    const catID = req.params.catId;
    CategoryRepository.getCategoryByID(catID)
        .then(cats => {
            if (!cats) {
                res.status(404).json({
                    message: 'Category with id: ' + catID + ' not found'
                })
            } else {
                res.status(200).json(cats);
            }
        });
};

exports.createCategory = (req, res, next) => {
    CategoryRepository.createCategory(req.body)
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

exports.updateCategory = (req, res, next) => {
    const catId = req.params.catId;
    CategoryRepository.updateCategory(catId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Category updated!', category: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteCategory = (req, res, next) => {
    const catId = req.params.catId;
    CategoryRepository.deleteCategory(catId)
        .then(result => {
            res.status(200).json({ message: 'Removed Category', category: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};