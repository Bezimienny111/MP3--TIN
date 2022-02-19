const sequelize = require('./sequelize');
const authUtil = require('../../utils/authUtils');
const passHash = authUtil.hashPassword('12345');

const News = require('../../model/sequelize/News');
const Newsman = require('../../model/sequelize/Newsman');
const Category = require('../../model/sequelize/Category');

module.exports = () => {
    Newsman.hasMany(News, { as: 'news', foreignKey: { name: 'Newsman_ID_Newsman', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
    News.belongsTo(Newsman, { as: 'newsman', foreignKey: { name: 'Newsman_ID_Newsman', allowNull: false } });
    Category.hasMany(News, { as: 'news', foreignKey: { name: 'Category_ID_Category', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
    News.belongsTo(Category, { as: 'cattegory', foreignKey: { name: 'Category_ID_Category', allowNull: false } });

    let allNews, allCat;
    return sequelize.sync({ force: true }).then(() => {
        return Newsman.findAll();
    }).then(newsmans => {
        if (!newsmans || newsmans.length == 0) {
            return Newsman.bulkCreate([
                {password:authUtil.hashPassword('222'), Nick: 'Bezi', Email: 'bezi@gmail.com', Name: 'Rob', Surname: 'Kow', Salary_per_news: 10,Admin: 1 },
                {password:authUtil.hashPassword('123'), Nick: 'Myla', Email: 'myla@gmail.com', Name: 'Tom', Surname: 'Ka', Salary_per_news: 15, Admin: 0},
            ]).then(() => {
                return Newsman.findAll();
            });
        } else {
            return newsmans;
        }
    }).then(newsmans => {
        allNews = newsmans;
        return Category.findAll();
    }).then(cats => {
        if (!cats || cats.length == 0) {
            return Category.bulkCreate([
                { Description: 'Sport', _Date: '2001-01-01' },
                { Description: 'Muzyka', _Date: '2001-04-01' },
            ]).then(() => {
                return Category.findAll();
            });
        } else {
            return cats;
        }
    }).then(cats => {
        allCat = cats;
        return News.findAll();
    }).then(newss => {
        if (!newss || newss.length == 0) {
            return News.bulkCreate([
                { Category_ID_Category: allCat[0].ID_Category, Newsman_ID_Newsman: allNews[0].ID_Newsman, Content: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', _Date: '2001-04-01', Dodatkowe_linki: null },
                { Category_ID_Category: allCat[0].ID_Category, Newsman_ID_Newsman: allNews[1].ID_Newsman, Content: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbb', _Date: '2001-04-01', Dodatkowe_linki: 'wwww.wwww.www' },
                { Category_ID_Category: allCat[1].ID_Category, Newsman_ID_Newsman: allNews[1].ID_Newsman, Content: 'ccccccccccccccccccccccccccc', _Date: '2001-04-01', Dodatkowe_linki: null },
            ]);
        } else {
            return newss;

        }
    });
};
  