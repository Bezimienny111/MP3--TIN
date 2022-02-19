const Newsman = require("../../model/sequelize/Newsman");
const News = require("../../model/sequelize/News");
const Category = require("../../model/sequelize/Category");

exports.getCategory = () => {
    return Category.findAll();
};

exports.getCategoryByID = (catID) => {
    return Category.findByPk(catID,
        
        {
            include: [{
                model: News,
                as: 'news',
                include: [{
                    model: Newsman,
                    as: 'newsman'
                }]
          }]
        });
};

exports.createCategory = (newCatData) => {
    return Category.create({
        Description: newCatData.Description,
        _Date: newCatData._Date,
    });
};
exports.updateCategory = (catId, newCatData) => {
    const Description = newCatData.Description;
    const _Date = newCatData._Date;
    return Category.update(newCatData, { where: { ID_Category: catId } });
};

exports.deleteCategory = (catId) => {
    return Category.destroy({
        where: { ID_Category: catId }
    });
};