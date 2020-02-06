const { groups } = require('../../models/index')

class Groups {
    async store(req, res){
        let groupBody = {
            ...req.body,
            'user.id_user': req.headers.auth.id
        }

        try {
            let createGroup = await groups.create(groupBody);
            res.status(200).json({
                messageCode: 0,
                message: {
                    title: "Sucesso",
                    message: "Grupo criado com sucesso!"
                },
                data: createGroup
            })
        } catch (error) {
            res.status(200).json({
                messageCode: 3,
                message: {
                    title: "Erro",
                    message: "Não foi posível criar grupo!"
                },
                data: error
            })
        }
    }

    async show(req, res){
        try {
            let showGroup = await groups.find({ 'user.id_user': req.query.id });
            res.status(200).json({
                messageCode: 0,
                message: {
                    title: "Sucesso",
                    message: "Tarefas listas com sucesso!"
                },
                data: showGroup
            })
        } catch (error) {
            res.status(200).json({
                messageCode: 3,
                message: {
                    title: "Erro",
                    message: "Não foi posível listar tarefas!"
                },
                data: error
            })
        }
    }

    async showById(req, res){

    }

    async update(req, res){

    }

    async delete(req, res){

    }
}

module.exports = new Groups();