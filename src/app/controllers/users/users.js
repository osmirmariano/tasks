"use strict";
const { users } = require('../../models/index');
var bcrypt = require('bcryptjs');

class Users {
    async store(req, res){
        let hash = bcrypt.hashSync(req.body.password, 8);
        let userBody = {
            ...req.body,
            "password.password": hash,
            "email.email": req.body.email
        }

        try {
            let userCreate = await users.create(userBody)
            res.status(200).json({
                messageCode: 0,
                message: {
                    title: "Sucesso",
                    message: "Usuário registrado com sucesso!"
                },
                data: userCreate
            })
        } catch (error) {
            res.status(400).json({
                messageCode: 3,
                message: {
                    title: "Erro",
                    message: "Não foi possível criar usuário"
                },
                erro: error
            })
        }
    }

    async show(req, res){
        console.log('ghjkjh')
    }

    async showById(req, res){

    }

    async update(req, res){

    }

    async index(req, res){

    }
}

module.exports = new Users();