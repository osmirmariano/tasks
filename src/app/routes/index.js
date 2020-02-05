const routes = require('express').Router()
// const auth = require("../middlewares/check_token")
const packageJson = require('../../../package.json');

routes.get('/', (req, res) => {
    res.type('text/plain')
    res.send(`${packageJson.name}`)
})

// routes.use(auth.checkToken);
routes.use("/groups", require("./groups"));
routes.use("/tasks", require("./tasks"));
routes.use("/users/admin", require("./admin"));
routes.use("/users", require("./users"));
routes.use("/login", require("./login"));


module.exports = routes;