const Newsman = require("../../model/sequelize/Newsman");
const News = require("../../model/sequelize/News");
const Category = require("../../model/sequelize/Category");
const authUtil = require('../../utils/authUtils');

exports.getNewsmans = () => {
    return Newsman.findAll();
};

exports.findByNick = (nick) => {
return Newsman.findOne({
    where: {Nick: nick}
});
}

exports.getNewsmanById = (manID) => {
    return Newsman.findByPk(manID,
        {
            include: [{
                model: News,
                as: 'news',
                include: [{
                    model: Category,
                    as: 'cattegory'
                }]
            }]
        });
};

exports.createNewsman = (newManData) => {
   // console.log("--Tu powinno wypisac---");
  //  console.log(JSON.stringify(newManData));
    return Newsman.create({
        Nick: newManData.Nick,
        password: authUtil.hashPassword(newManData.password),
        Email: newManData.Email,
        Name: newManData.Name,
        Surname: newManData.Surname,
        Salary_per_news: newManData.Salary_per_news,
        Admin: newManData.Admin
    });
};
exports.updateNewsman = (newsmanId, newManData) => {
       console.log("--Tu powinno wypisac---");
   console.log(JSON.stringify(newManData));
    const Nick = newManData.Nick;
    const Email = newManData.Email;
    const Name = newManData.Name;
    const Surname = newManData.Surname;
    const Salary_per_news = newManData.Salary_per_news;
    const password = authUtil.hashPassword(newManData.password);
    const Admin = newManData.Admin;
    return Newsman.update(newManData, { where: { ID_Newsman: newsmanId } });
};

exports.deleteNewsman = (manId) => {
    return Newsman.destroy({
        where: { ID_Newsman: manId }
    });
};