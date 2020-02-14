const { groups } = require('../models/index');

class CheckPermission {
    constructor() {}

    /**
     * Method for check permission users
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async checkPermissionGroup(req, res, next) {
        let array = req.path.split("/");
        let userGroup = await groups.findOne({ 'user.id_user': req.headers.auth.id, _id: array[array.length-1] });
        userGroup ?
            next()
        : res.status(401).json({
            messageCode: 3,
            message: {
                title: "Erro",
                message: "Você não permissão para executar essa ação no grupo"
            }
        })
    }
}

module.exports = new CheckPermission();