const DbController = require("./db.controller");
const UserService = require("../services/user.service");
const bcrypt = require("bcrypt");
const config = require('../configs/auth.config');
const jwt = require('jsonwebtoken');

class UserController extends DbController {

  login = async (req) => {
    const service = new UserService();
    const results = await service.select({
      where: `email = '${req.body.email}'`,
    });
    const user = results.length === 1 ? results.pop() : null;
    if(user){
        const result =  await bcrypt.compare(req.body.password, `${config.HASH_PREFIX + user.password}`);
        if(result){
            const {email, role} = user;
            const token = jwt.sign({email, role}, config.JWT_SECRET, { expiresIn: '1d' });
            return {email, role, token, result: true, message: "Bienvenue !"};
        }
        return {result: false, message: "Mot de passe incorrect !"};
    }
    return {result: false, message: "Identifiant incorrect !"};
  };
}

module.exports = UserController