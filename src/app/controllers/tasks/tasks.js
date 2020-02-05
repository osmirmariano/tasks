
const { tasks } = require('../../models/index')
var moment = require('moment');

class Tasks {
    async store(req, res){
        var dia  = req.body.date_start.split("-")[0];
        var mes  = req.body.date_start.split("-")[1];
        var ano  = req.body.date_start.split("-")[2];
        dia[0] == 0 ? dia = dia[1] : dia = dia;

        var dia2  = req.body.date_end.split("-")[0];
        var mes2  = req.body.date_end.split("-")[1];
        var ano2  = req.body.date_end.split("-")[2];
        dia2[0] == 0 ? dia2 = dia2[1] : dia2 = dia2;

        req.body.date_start = moment().date(dia).month(mes).year(ano).format('YYYY-MM-DDTHH:mm:ss');
        req.body.date_end = moment().date(dia2).month(mes2).year(ano2).format('YYYY-MM-DDTHH:mm:ss');

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

    async show(req, res){

    }

    async showById(req, res){

    }

    async update(req, res){

    }

    async delete(req, res){

    }
}

module.exports = new Tasks();