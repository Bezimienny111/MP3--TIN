const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(8);
const NewsRepository = require('../repository/sequelize/NewsRepository');

exports.hashPassword = (passPlain) => {
    const passHashed = bcrypt.hashSync(passPlain, salt);
    return passHashed;
}

exports.comparePasswords = (passPlain, passHash) => {
    const res = bcrypt.compareSync(passPlain, passHash);
    return res;
}

exports.permitAuthenticatedUser = (req, res, next) => {
    const loggedUser = req.session.loggedUser;
    console.log(loggedUser);
    if(loggedUser) {
        next();
    } else {
        throw new Error('unauthorized access');
    }
}
exports.permitAdminAuthenticatedUser = (req, res, next) => {
    const loggedUser = req.session.loggedUser;
  //  console.log(loggedUser);
    if(loggedUser.Admin === 1) {
        next();
    } else {
        throw new Error('unauthorized access');
    }

}
exports.permitUserAuthenticatedUser = async (req, res, next) => {

    const newId = req.params.newId;
    const loggedUser = req.session.loggedUser;
    let tmpTest;
   // const id_user = res.body;
    let id_ret;
   function GetId_(){
    let id_tmp;
    return id_tmp = NewsRepository.getNewsByID(newId).then(news => {
     return news.Newsman_ID_Newsman});
    }

    async function fnAsync() {
      //  try{
        id_ret = await GetId_();
        console.log("TU POWINNO BYĆ COŚ IDDD");
        console.log(id_ret);
        console.log("TU POWINNO BYĆ COŚ");
        console.log(id_ret);
        console.log(loggedUser.ID_Newsman);
         if(loggedUser.ID_Newsman === id_ret) {
           return tmpTest = 1;
        } 
        else {
         //   return tmpTest = 0;
       // }
    //}catch (error) {
        return new Error('unauthorized access');
       }
  //  }catch(err){}

}

tmpTest = await fnAsync();
  console.log(tmpTest);
  if(tmpTest === 1) {
    next();
} else {
   next(tmpTest);
}
}


