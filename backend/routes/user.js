const router = require('express').Router()

const userController = require('../controllers/userController')

// Requisição POST dos Usúarios
/*router
    .route('/user')
    .post((req, res) => userController.create(req, res))*/

// Requisição GET para todos os usúarios
router
    .route('/user')
    .get((req, res) => userController.getAll(req, res))

// Requisição GET para um único usúario
router
    .route('/user/:id')
    .get((req, res) => userController.get(req, res))

// Requisição DELETE para dos usúarios
router
    .route('/user/:id')
    .delete((req, res) => userController.delete(req, res))

// Requisição PATCH para dos usúarios
router
    .route('/user/:id')
    .patch((req, res) => userController.update(req, res))

module.exports = router;