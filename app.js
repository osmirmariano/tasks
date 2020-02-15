const serverless = require("serverless-http");
const app = require('./src/app/')
require('./src/app/controllers/chats/chat')
//o arquivo yml chama o serverless(app)
module.exports.handler = serverless(app);