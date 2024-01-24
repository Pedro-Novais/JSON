const router = require('express').Router()

// Tasks Router
const usersRouter = require('./user')
const taskRouter = require('./task')
const configRouter = require('./config')
const statisticRouter = require('./statistic')
const registerRouter = require('./register')
const loginRouter = require('./login')

router.use('/', usersRouter)
router.use('/', taskRouter)
router.use('/', configRouter)
router.use('/', statisticRouter)
router.use('/', registerRouter)
router.use('/', loginRouter)

module.exports = router;