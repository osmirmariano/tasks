const routes = require('express').Router()
const packageJson = require('../../../package.json');

routes.get('/', (req, res) => {
    res.type('text/plain')
    res.send(`${packageJson.name}`)
})

module.exports = routes;