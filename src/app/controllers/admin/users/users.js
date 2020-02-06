"use strict";
const { users } = require('../../../models/index');
var bcrypt = require('bcryptjs');
const { PERMISSIONS } = require('../../../constants/constants');

class UsersAdmin {
    /**
     * Method for create user admin
     * @param {*} req 
     * @param {*} res 
     */
    async store(req, res){
        let hash = bcrypt.hashSync(req.body.password, 8);
        let userBody = {
            ...req.body,
            "password.password": hash,
            "email.email": req.body.email,
            "permissions": PERMISSIONS.master
        }

        try {
            let userCreate = await users.create(userBody)
            res.status(200).json({
                messageCode: 0,
                message: {
                    title: "Sucesso",
                    message: "Usuário admin registrado com sucesso!"
                },
                data: userCreate
            })
        } catch (error) {
            res.status(400).json({
                messageCode: 3,
                message: {
                    title: "Erro",
                    message: "Não foi possível criar usuário admin"
                },
                erro: error
            })
        }
    }

    /**
     * Method for delete user, admin with permission do can
     * @param {*} req 
     * @param {*} res 
     */
    async delete(req, res){
        try {
            await users.findOneAndDelete({ _id: req.params.id })
            res.status(200).json({
                messageCode: 0,
                message: {
                    title: "Sucesso",
                    message: "Usuário deletado com sucesso!"
                },
            })
        } catch (error) {
            res.status(400).json({
                messageCode: 3,
                message: {
                    title: "Erro",
                    message: "Não foi possível deletar usuário"
                },
                erro: error
            })
        }
    }

    /**
     * Method for list all users 
     * @param {*} req 
     * @param {*} res 
     */
    async show(req, res){
        try {
            let page = 1
            let results = 100
            let queryGeneric = {}

            if (req.query.page)
                page = parseInt(req.query.page)
            if (req.query.results)
                results = parseInt(req.query.results)
            users.countDocuments(queryGeneric, (err, count) => {
                users.find({}, (err, finded) => {
                    res.status(200).send({
                        messageCode: 0,
                        count: count,
                        pageNumbers: Math.ceil((count / results)),
                        page: page,
                        data: finded,
                        message: {
                            title: "Sucesso",
                            message: "Usuários listados com sucesso"
                        }
                    })
                })
                .limit(results)
                .skip((page * results) - results)
                .exec()
            })
        } catch (error) {
            res.status(400).json({
                messageCode: 3,
                message: {
                    title: "Erro",
                    message: "Não foi possível listar os usuários"
                },
                erro: error
            })
        }
    }
}

module.exports = new UsersAdmin();