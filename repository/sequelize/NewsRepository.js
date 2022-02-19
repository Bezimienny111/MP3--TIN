const Sequelize = require('sequelize');

const Newsman = require("../../model/sequelize/Newsman");
const News = require("../../model/sequelize/News");
const Category = require("../../model/sequelize/Category");

exports.getNews = () => {
    return News.findAll({
        include: [
            {
                model: Newsman,
                as: 'newsman'
            },
            {
                model: Category,
                as: 'cattegory'
            }]
    });
};

exports.getNewsByID = (newsD) => {
    return News.findByPk(newsD, {
        include: [
            {
                model: Newsman,
                as: 'newsman'
            },
            {
                model: Category,
                as: 'cattegory'
            }]
    });
};

exports.createNews = (data) => {
  
    return News.create(
        {
        Category_ID_Category: data.Category_ID_Category,
        Newsman_ID_Newsman: data.Newsman_ID_Newsman,
        Content: data.Content,
        _Date: data._Date,
        Dodatkowe_linki: data.Dodatkowe_linki
        }
    );
};

exports.updateNews = (newsId, data) => {
    const Category_ID_Category = data.Category_ID_Category;
    const Newsman_ID_Newsman = data.Newsman_ID_Newsman;
    const Content = data.Content;
    const _Date = data._Date
    const Dodatkowe_linki = data.Dodatkowe_linki;
    return News.update(data, { where: { ID_news: newsId } });
};

exports.deleteNews = (newsId) => {
    return News.destroy({
        where: { ID_news: newsId }
    });
};

exports.deleteManyNews = (newsId) => {
    return Result.find({ ID_news: { [Sequelize.Op.in]: newsId } })
}