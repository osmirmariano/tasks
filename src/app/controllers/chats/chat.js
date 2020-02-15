const base64 = require('js-base64').Base64
const socket_io = require('socket.io')
const redis = require('redis')
const redisAdapter = require('socket.io-redis')
const { app } = require('../../index')
const _ = require('lodash')
const http = require('http').Server(app)

//Configurando socket
const io = socket_io(http, {
    path: '/socket.v1'
})

//configuração redis
const pubRedisClient = redis.createClient()
const subRedisClient = redis.createClient()

//configuração socket-redis-io
io.adapter(redisAdapter({
    pubClient: pubRedisClient,
    subClient: subRedisClient
}))

io.on('connection', async socket => {
    socket.emit('request', /* … */); // emit an event to the socket
    io.emit('broadcast', /* … */); // emit an event to all connected sockets
    socket.on('reply', () => { /* … */ }); // listen to the event
})


module.exports = { io };