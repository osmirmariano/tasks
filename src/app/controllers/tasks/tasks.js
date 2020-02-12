
const { tasks } = require('../../models/index');
var moment = require('moment');

class Tasks {
    /**
     * Method for create tasks
     * @param {*} req 
     * @param {*} res 
     */
    async store(req, res){
        req.body.date_start = moment(req.body.date_start).format("YYYY-MM-DDTHH:mm:ss");
        req.body.date_end = moment(req.body.date_end).format("YYYY-MM-DDTHH:mm:ss");

        let taskBody = {
            ...req.body,
            'user.id_user': req.headers.auth.id,
            'group.id_group': req.query.id,
            'status': 'create'
        }

        try {
            let createTask = await tasks.create(taskBody);
            res.status(200).json({
                messageCode: 0,
                message: {
                    title: "Sucesso",
                    message: "Tarefa criada com sucesso!"
                },
                data: createTask
            })
        } catch (error) {
            res.status(200).json({
                messageCode: 3,
                message: {
                    title: "Erro",
                    message: "Não foi posível criar tarefa!"
                },
                data: error
            })
        }
    }

    /**
     * Method for list all tasks
     * @param {*} req 
     * @param {*} res 
     */
    async show(req, res){
        try {
            let showTask = await tasks.find({ 'group.id_group': req.query.id });
            res.status(200).json({
                messageCode: 0,
                message: {
                    title: "Sucesso",
                    message: "Tarefas listas com sucesso!"
                },
                data: showTask
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
     * Method for list task in id
     * @param {*} req 
     * @param {*} res 
     */
    async showById(req, res){
        try {
            let showTask = await tasks.findOne({ _id: req.params.id });
            res.status(200).json({
                messageCode: 0,
                message: {
                    title: "Sucesso",
                    message: "Tarefa lista com sucesso!"
                },
                data: showTask
            })
        } catch (error) {
            res.status(200).json({
                messageCode: 3,
                message: {
                    title: "Erro",
                    message: "Não foi posível listar a tarefa!"
                },
                data: error
            })
        }
    }

    /**
     * Method for update task in id
     * @param {*} req 
     * @param {*} res 
     */
    async update(req, res){
        
        req.body.date_start ? req.body.date_start = moment(req.body.date_start).format("YYYY-MM-DDTHH:mm:ss") : false;
        req.body.date_end ? req.body.date_end = moment(req.body.date_end).format("YYYY-MM-DDTHH:mm:ss") : false;

        let taskBody = {
            ...req.body,
            'updated': moment().format("YYYY-MM-DDTHH:mm:ss")
        }
        
        try {
            let updateTask = await tasks.findByIdAndUpdate({ _id: req.params.id }, taskBody, { new: true});
            res.status(200).json({
                messageCode: 0,
                message: {
                    title: "Sucesso",
                    message: "Tarefa atualizada com sucesso!"
                },
                data: updateTask
            })
        } catch (error) {
            res.status(200).json({
                messageCode: 3,
                message: {
                    title: "Erro",
                    message: "Não foi posível atualizar tarefa!"
                },
                data: error
            })
        }
    }

    /**
     * Method for delete task in id
     * @param {*} req 
     * @param {*} res 
     */
    async delete(req, res){
        try {
            await tasks.findOneAndDelete({ _id: req.params.id });
            res.status(200).json({
                messageCode: 0,
                message: {
                    title: "Sucesso",
                    message: "Tarefa deletada com sucesso!"
                }
            })
        } catch (error) {
            res.status(200).json({
                messageCode: 3,
                message: {
                    title: "Erro",
                    message: "Não foi posível deletar a tarefa!"
                },
                data: error
            })
        }
    }
}

module.exports = new Tasks();