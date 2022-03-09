const DbRouter = require("./db.router");

class UserRouter extends DbRouter {

    constructor(){
        super();
        this.initalizeRoutes();
    }

    initalizeRoutes = () => {
        // /auth/login
        this.router.post("/login", async (req, res, next) => {
            // const response = await this.controller.login(req);
            // res.json(response);
            next(this.controller.login);
        });
    }

}

module.exports = UserRouter;