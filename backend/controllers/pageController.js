const { User: UserModel } = require('../models/user')

require('dotenv').config()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const pageController = {

    verification: async (req, res) =>{
        try {
            
            res.redirect('login')
            
        } catch (error) {
            console.log(error)
        }
    },
    pageIndex: async (req, res) =>{
        try {
           
            res.render('index')
        } catch (error) {
            console.log(error)
        }
    },

    pageLogin: async (req, res) =>{
        try {

            res.render('initial')
            
        } catch (error) {
            console.log(error)
        }

    }

}

module.exports = pageController