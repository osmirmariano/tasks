const { groups, tasks } = require('../../models/index')

class Groups {
    /**
     * Method for create group
     * @param {*} req 
     * @param {*} res 
     */
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

    /**
     * Method for list all groups
     * @param {*} req 
     * @param {*} res 
     */
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

    /**
     * Method for list groups in Id
     * @param {*} req 
     * @param {*} res 
     */
    async showById(req, res){
        try {
            let showGroup = await groups.findById({ _id: req.params.id });
            showGroup ?
            res.status(200).json({
                messageCode: 0,
                message: {
                    title: "Sucesso",
                    message: "Grupo listado com sucesso!"
                },
                data: showGroup
            })
            :
            res.status(200).json({
                messageCode: 0,
                message: {
                    title: "Sucesso",
                    message: "Não foi encontrado nenhum grupo com esse Id!"
                }
            })
        } catch (error) {
            res.status(200).json({
                messageCode: 3,
                message: {
                    title: "Erro",
                    message: "Não foi posível listar o grupo!"
                },
                data: error
            })
        }
    }

    /**
     * Method for update group in Id
     * @param {*} req 
     * @param {*} res 
     */
    async update(req, res){
        let groupBody = {
            ...req.body
        }
        
        try {
            let updateGroup = await groups.findByIdAndUpdate({ _id: req.params.id }, groupBody, { new: true});
            updateGroup ?
            res.status(200).json({
                messageCode: 0,
                message: {
                    title: "Sucesso",
                    message: "Grupo atualizada com sucesso!"
                },
                data: updateGroup
            })
            :
            res.status(200).json({
                messageCode: 0,
                message: {
                    title: "Sucesso",
                    message: "Não foi encontrado nenhum grupo com esse Id!"
                }
            })
        } catch (error) {
            res.status(400).json({
                messageCode: 3,
                message: {
                    title: "Erro",
                    message: "Não foi posível atualizar grupo!"
                },
                data: error
            })
        }
    }

    /**
     * Method for delete group in Id
     * @param {*} req 
     * @param {*} res 
     */
    async delete(req, res){
        try {
            let de = await groups.findOneAndDelete({ _id: req.params.id });
            await tasks.remove({ 'group.id_group': req.params.id });
            de ?
            res.status(200).json({
                messageCode: 0,
                message: {
                    title: "Sucesso",
                    message: "Grupo deletado com sucesso!"
                }
            })
            :
            res.status(200).json({
                messageCode: 0,
                message: {
                    title: "Sucesso",
                    message: "Não existe grupo com esse Id!"
                }
            })
        } catch (error) {
            res.status(400).json({
                messageCode: 3,
                message: {
                    title: "Erro",
                    message: "Não foi posível deletar grupo!"
                },
                data: error
            })
        }
    }

    /**
     * Method for share group with users
     * @param {*} req 
     * @param {*} res 
     */
    async share(req, res) {

    }
}

module.exports = new Groups();