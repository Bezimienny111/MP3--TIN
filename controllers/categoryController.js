const Category = require('../model/sequelize/Category');
const CategoryRepository = require('../repository/sequelize/CategoryRepository');



exports.showCategoryList = (req, res, next) => {
    CategoryRepository.getCategory().then(cats => {
        res.render('pages/Category/list', {
            categories: cats,
            navLocation: 'cat'
        });
    });
}


exports.showAddCategoryForm = (req, res, next) => {

        res.render('pages/Category/form', {
        categories: {},
        pageTitle: req.__('cat.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('cat.form.add.btnLabel'),
        formAction: '/category/add',
        navLocation: 'cat',
        validationErrors: []
    });
}

exports.showEditCategoryForm = (req, res, next) => {
    const catID = req.params.catId;
    CategoryRepository.getCategoryByID(catID)
        .then(cats => {
            res.render('pages/Category/form', {
                categories: cats,
                formMode: 'edit',
                pageTitle: req.__('cat.form.edit.pageTitle'),
                btnLabel: req.__('cat.form.edit.btnLabel'),
                formAction: '/category/edit',
                navLocation: 'cat',
                validationErrors: []
            });
        });
};

exports.showCategoryDetails = (req, res, next) => {

    const catsID = req.params.catId;

    CategoryRepository.getCategoryByID(catsID)
        .then(cats => {
            res.render('pages/Category/form', {
                categories: cats,
                formMode: 'showDetails',
                pageTitle: req.__('cat.form.catdet'),
                formAction: '',
                navLocation: 'cat',
                validationErrors: []
            });
        });

}


exports.addCategory = (req, res, next) => {
    const catData = { ...req.body };
  //  console.log("Tu powinna być data");
   // console.log(req.body._Date);
   // console.log("-------------------------");
  /////  console.log(JSON.stringify(catData));
   // console.log("-------------------------");
   // console.log(req.body._Date);
    CategoryRepository.createCategory(catData)
        .then(result => {
            res.redirect('/category');
        })
        .catch(err => {
            res.render('pages/Category/form', {
                categories: catData,
                pageTitle:  req.__('cat.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel:  req.__('cat.form.add.btnLabel'),
                formAction: '/category/add',
                navLocation: 'cat',
                validationErrors: err.errors
            });
        });
}

exports.updateCategory = (req, res, next) => {
    const catId = req.body.ID_Category;
  //  console.log("Tu powinna być data");
 //   console.log(req.body._Date);
   //req.body._Date = req.body._Date.toISOString().split('T')[0];
    const catData = { ...req.body };
    
  // console.log("-------------------------");
  //  console.log(JSON.stringify(catData));
  //  console.log("-------------------------");
    CategoryRepository.updateCategory(catId, catData)
        .then(result => {
            res.redirect('/category');
        })
        .catch(err => {
            res.render('pages/Category/form', {
                categories: catData,
                pageTitle: req.__('cat.form.edit.pageTitle'),
                formMode: 'edit',
                btnLabel: req.__('cat.form.edit.btnLabel'),
                formAction: '/category/edit',
                navLocation: 'cat',
                validationErrors: err.errors
            });
        });
}

exports.deleteCategory= (req, res, next) => {
    const catId = req.params.catId;
    CategoryRepository.deleteCategory(catId)
        .then(() => {
            res.redirect('/category');
        });
};

//exports.showCategoryList = (req, res, next) => {
//	res.render('pages/Category/list', { navLocation: 'cat' });
//}
//exports.showCategoryForm = (req, res, next) => {
//	res.render('pages/Category/form', { navLocation: 'cat' });
//}
//exports.showCategoryDetails = (req, res, next) => {
//	res.render('pages/Category/list-every', { navLocation: 'cat' });
//