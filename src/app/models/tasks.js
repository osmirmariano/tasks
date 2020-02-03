//modulo de configuração do database tasks
const mongoose = require('../config/database')

//define o schema do tasks
const tasksSchema = mongoose.Schema({
    title: { 
        type: String,
        required: [true, 'Titulo não informado.'] 
    },
    description: { 
        type: String,
        required: [true, 'Descrição não informado.'] 
    },
    status: {
        type: String,
        enum: { values: ['create', 'running', 'finalized', 'canceled', 'paused'] },
    },
    category: [{
        type: String,
        required: [true, 'Categoria não informado.'] 
    }],
    date_start: {
        type: Date,
    },
    date_end: {
        type: Date
    },
    user: {
        id_user: {
            type: mongoose.Schema.Types.ObjectId, ref: 'users', 
            default: null 
        },
    },
    group: {
        id_group: {
            type: mongoose.Schema.Types.ObjectId, ref: 'groups', 
            default: null 
        },
        id_user_sharing: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
        permissions: [{
            type: String, enum: PERMISSIONS
        }],
    },
    registered: { type: Date, default: Date.now },
    updated: { type: Date, default: null },
})

//define o model do database tasks com todos os campos
const tasks = mongoose.model('tasks', tasksSchema)

//exporta o modulo, nesse caso ele deve ser requerido caso queira manipular essa colection
module.exports = tasks
