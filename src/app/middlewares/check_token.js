const { users } = require('../models/index')
var jwt = require('jsonwebtoken')
var config = require('../../config/config');
const keys = require('../constants/keys');

class CheckToken {
    constructor() { }

    async check(req, res, next) {
        const token = req.headers.authorization;
        if (!token) {
            res.status(401).json({
                messageCode: 5,
                message: {
                    title: "Erro",
                    message: "Token inválido!"
                },
                auth: false
            })
        } else {
            jwt.verify(token, config.secret, async (err, decoded) => {
                if (err) {
                    res.status(400).json({
                        messageCode: 3,
                        message: {
                            title: "Erro",
                            message: "Falha na autenticação do token!"
                        },
                        auth: false
                    })
                } else {
                    try{
                        let usersFindId = await users.findById(decoded.id, 'user name email.email phone registered');
                        if(!usersFindId)  {
                            res.status(401).json({
                                messageCode: 3,
                                message: {
                                    title: "Erro",
                                    message: "Erro ao encontrar usuário!"
                                }
                            })
                        }  else {
                            next();
                        }
                    } catch (error) {
                        res.status(401).json({
                            messageCode: 3,
                            message: {
                                title: "Erro",
                                message: "Erro ao encontrar usuário!"
                            }
                        })
                    }
                }
            });
        }
    }

    async checkAdmin(req, res, nex) {
        const key = req.headers.key;
        // if(key.KEYS)
    }
}

module.exports = new CheckToken();