const router = require('express').Router()

// Tasks Router
const usersRouter = require('./user')
const taskRouter = require('./task')
const configRouter = require('./config')
const statisticRouter = require('./statistic')

router.use('/', usersRouter)
router.use('/', taskRouter)
router.use('/', configRouter)
router.use('/', statisticRouter)

module.exports = router;