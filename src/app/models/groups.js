//modulo de configuração do database groups
const mongoose = require('../config/database')

//define o schema do groups
const groupsSchema = mongoose.Schema({
    name: { 
        type: String,
        required: [true, 'Nome não informado.'] 
    },
    user: {
        id_user: {
            type: mongoose.Schema.Types.ObjectId, ref: 'users', 
            default: null 
        },
        id_user_sharing: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    },
    task: {
        id_task: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tasks' }],
    },
    registered: { type: Date, default: Date.now },
    updated: { type: Date, default: null },
})

//define o model do database groups com todos os campos
const groups = mongoose.model('groups', groupsSchema)

//exporta o modulo, nesse caso ele deve ser requerido caso queira manipular essa colection
module.exports = groups
