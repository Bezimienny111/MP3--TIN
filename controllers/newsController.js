const NewsRepository = require('../repository/sequelize/NewsRepository');
const CategoryRepository = require('../repository/sequelize/CategoryRepository');
const NewsmanRepository = require('../repository/sequelize/NewsmanRepository');



exports.showNewsList = (req, res, next) => {
    NewsRepository.getNews().then(newsy => {
        res.render('pages/News/list', {
            news: newsy,
            navLocation: 'news'
        });
    });
}

exports.showAddNewsForm = (req, res, next) => {
    
    let allNewsman, allCategories;
    CategoryRepository.getCategory().then(cats => {
        allCategories = cats;
        return NewsmanRepository.getNewsmans();
    }).then(mans => {
        allNewsman = mans;
        res.render('pages/News/form', {
            news: {},
            allcat: allCategories,
            allman: allNewsman,
            pageTitle: req.__('news.form.add.pageTitle'),
            formMode: 'createNew',
            btnLabel: req.__('news.form.add.btnLabel'),
            formAction: '/news/add',
            navLocation: 'news',
            validationErrors: []
        });
    });
}


exports.showEditNewsForm = (req, res, next) => {
    const newId = req.params.newId;
    let allNewsman, allCategories;
    CategoryRepository.getCategory().then(cats => {
        allCategories = cats;
        return NewsmanRepository.getNewsmans();
    }).then(mans => {
        allNewsman = mans;
        return NewsRepository.getNewsByID(newId);
    }).then(news => {
        //   console.log("Newwwws-----------------");
        //  console.log(JSON.stringify(news));
        res.render('pages/News/form', {
            news: news,
            allcat: allCategories,
            allman: allNewsman,
            formMode: 'edit',
            pageTitle: req.__('news.form.edit.pageTitle'),
            btnLabel:  req.__('news.form.edit.btnLabel'),
            formAction: '/news/edit',
            navLocation: 'news',
            validationErrors: []
        });
    });
};




exports.showNewsDetails = (req, res, next) => {
    const newId = req.params.newId;
    let allNewsman, allCategories;
    CategoryRepository.getCategory().then(cats => {
        allCategories = cats;
        return NewsmanRepository.getNewsmans();
    }).then(mans => {
        allNewsman = mans;
        return NewsRepository.getNewsByID(newId);
    }).then(news => {
        res.render('pages/News/form', {
            allcat: allCategories,
            allman: allNewsman,
                news: news,
                formMode: 'showDetails',
                pageTitle: req.__('news.form.newdet'),
                formAction: '',
                navLocation: 'news',
                validationErrors: []
            });
        });

}

exports.addNews = (req, res, next) => {
  //  console.log("-------------------------");
   // console.log("Funkcja add");
    const newData = { ...req.body };
    let allNewsman, allCategories;
    NewsRepository.createNews(newData)
        .then(result => {
            res.redirect('/news');
           // console.log("tu nie powinienem byc");
        })
        .catch(err => {

            CategoryRepository.getCategory().then(cats => {
                allCategories = cats;
                return NewsmanRepository.getNewsmans();
            }).then(mans => {
                allNewsman = mans;
                err.errors.forEach(e => {
                    if (e.path.includes('Newsman_ID_Newsman')) {
                     //   console.log(e.type);
                        e.message = "Pole jest wymagane";
                    };
                    if (e.path.includes('Category_ID_Category')) {
                    //    console.log(e.type);
                        e.message = "Pole jest wymagane";
                    };
                });
              //  if (err.errors) {
              //      err.errors.forEach(e => {
              //          if (e.path.includes('Newsman_ID_Newsman')) {
              //              newData.Newsman_ID_Newsman = 0;
              //              console.log("blad newsman id");
              //          }
              //          if (e.path.includes('Category_ID_Category')) {
              //              newData.Category_ID_Category = 0;
             //           }
              //          if (e.path.includes('Content')) {
              //              newData.Content = "";
              //          }
             //           if (e.path.includes('Dodatkowe_linki')) {
            //                newData.Dodatkowe_linki = "";
             //           }
             //       }
             //       );
             //   }
              //  console.log(JSON.stringify(newData));
                res.render('pages/News/form', {
                    allcat: allCategories,
                    allman: allNewsman,
                    news: newData,
                    formMode: 'createNew',
                    pageTitle: req.__('news.form.add.pageTitle'),
                    btnLabel:  req.__('news.form.add.btnLabel'),
                    formAction: '/news/add',
                    navLocation: 'news',
                    validationErrors: err.errors
                });
            });
        });
}


exports.updateNews = (req, res, next) => {
    let allNewsman, allCategories, newsy, err;
    const newId = req.body.ID_news;
    const newData = { ...req.body };

    console.log(JSON.stringify("-----------"))
    console.log(JSON.stringify(newData))
    // NewsRepository.getNewsByID(newId).then(tmp => {
    //     newsy = tmp;
    //return
    CategoryRepository.getCategory().then(cats => {
        allCategories = cats;
        return NewsmanRepository.getNewsmans().then(mans => {
            allNewsman = mans;
            return NewsRepository.updateNews(newId, newData)
                .then(result => {
                    res.redirect('/news');
                })
                .catch(err => {
                    err = err;
                    return NewsRepository.getNewsByID(newId).then(news => {
                        newsy = news
                        newsy.Category_ID_Category = newData.Category_ID_Category;
                        newsy.Newsman_ID_Newsman = newData.Newsman_ID_Newsman;
                        newsy.Content = newData.Content;
                        newsy._Date = newData._Date;
                        newsy.Dodatkowe_linki = newData.Dodatkowe_linki;
                     //   console.log(JSON.stringify("-----------"))
                     //   console.log(JSON.stringify(err.errors))
                      //  if (err.errors) {
                     //       err.errors.forEach(e => {
                      //          if (e.path.includes('Newsman_ID_Newsman')) {
                      //              newsy.Newsman_ID_Newsman = 0;
                                    //  console.log(JSON.stringify("-----------"))
                                    //   console.log(JSON.stringify("Jestem w błędzie"));
                                    //   console.log(JSON.stringify(newData.Newsman_ID_Newsman));
                       //         }
                       //         if (e.path.includes('Category_ID_Category')) {
                      //              newsy.Category_ID_Category = 0;
                       //         }
                       //         if (e.path.includes('Content')) {
                       //             newsy.Content = "";
                      //          }
                       //         if (e.path.includes('Dodatkowe_linki')) {
                      //              newsy.Dodatkowe_linki = "";
                       //         }
                      //      }
                      //      );
                      //  }
                  //      console.log(JSON.stringify(allNewsman));
                   //     console.log(JSON.stringify("NewData"));
                  //      console.log(JSON.stringify(newData));

                        res.render('pages/News/form', {
                            allcat: allCategories,
                            allman: allNewsman,
                            news: newsy,
                            formMode: 'edit',
                            pageTitle: req.__('news.form.edit.pageTitle'),
                            btnLabel: req.__('news.form.edit.btnLabel'),
                            formAction: '/news/edit',
                            navLocation: 'news',
                            validationErrors: err.errors
                        });
                    });
                });
        });
    });
}


exports.deleteNews = (req, res, next) => {
    const newId = req.params.newId;
    NewsRepository.deleteNews(newId)
        .then(() => {
            res.redirect('/news');
        });
};

//exports.showNewsList = (req, res, next) => {
//	res.render('pages/News/list', {navLocation: 'news' });
//}
//exports.showNewsForm = (req, res, next) => {
//	res.render('pages/News/form', { navLocation: 'news' });
//}
//exports.showNewsDetails = (req, res, next) => {
//	res.render('pages/News/list-every', { navLocation: 'news' });
//}