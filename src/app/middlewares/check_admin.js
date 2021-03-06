const keys = require('../constants/keys');

class CheckAdmin {
    constructor() {}

    /**
     * Method for check profile admin
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async checkAdmin(req, res, next) {
        const key = req.headers.key;
        let user = await keys.find(x => x == key);
        user ? 
            next()
        : res.status(401).json({
            messageCode: 3,
            message: {
                title: "Erro",
                message: "Você não permissão de administrador"
            }
        })
    }
}

module.exports = new CheckAdmin();