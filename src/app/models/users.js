//modulo de configuração do database user
const mongoose = require('../../config/database')

//define o schema do user
const usersSchema = mongoose.Schema({
    user: { 
        type: String, 
        lowercase: true, 
        maxlength: 40, 
        unique: true, 
        sparse: true, 
        required: [true, 'Usuário não informado.'] 
    },
    name: { 
        type: String, 
        maxlength: 120, 
        required: [true, 'Nome não informado.'] 
    },
    password: {
        password: { type: String, required: [true, 'Senha não informada.'] },
        requested_change: { type: Boolean, default: false },
        last_change: { type: Date, default: null },
    },
    photo: {
        type: String,
    },
    email: {
        email: {
            type: String, 
            lowercase: true, 
            maxlength: 200, 
            required: [true, 'Email não informado.'], 
            unique: true, 
            sparse: true
        },
        email_change: {
            type: String, 
            lowercase: true, 
            maxlength: 200
        }
    },
    permission: [],
    phone: {
        type: String, maxlength: 30, lowercase: true, sparse: true
    },
    blocked: {
        type: Boolean,
        default: false
    },
    registered: { type: Date, default: Date.now },
    updated: { type: Date, default: null },
})

//define o model do database user com todos os campos
const users = mongoose.model('users', usersSchema)

//exporta o modulo, nesse caso ele deve ser requerido caso queira manipular essa colection
module.exports = users
