const { User: UserModel } = require('../models/user')
const { ConfirmationUser } = require('../models/confirmation')

require('dotenv').config()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const pageController = {

    pageWelcome: async (req, res) => {
        try {

            res.render('pages/pattern_extern')

        } catch (error) {
            console.log(error)
        }

    },

    pageLogin: async (req, res) => {
        try {

            res.render('pages/pattern_extern')

        } catch (error) {
            console.log(error)
        }

    },

    pageRecall: async (req, res) => {

        try {
            
            const code_verification = req.query.identifier

            const user = await ConfirmationUser.find({ code: code_verification })

            console.log(user)

            if (user.length == 1) {

                res.render('pages/recall')
                
            } else if (user.length > 1) {

                console.log('algum erro ocorreu')
                res.redirect('welcome')
            }
            else {
                res.redirect('welcome')
            }

        } catch (error) {
            console.log(error)
        }
    },

    pageRegister: async (req, res) => {
        try {

            res.render('pages/pattern_extern')

        } catch (error) {
            console.log(error)
        }

    },

    pageList: async (req, res) => {
        try {

            res.render('pages/pattern_intern')


        } catch (error) {
            console.log(error)
        }
    },

    pageProfile: async (req, res) => {
        try {

            res.render('pages/pattern_intern')

        } catch (error) {
            console.log(error)
        }
    },

    pagePersonalization: async (req, res) => {
        try {

            res.render('pages/pattern_intern')

        } catch (error) {
            console.log(error)
        }
    },

    pageStatistic: async (req, res) => {

        res.render('pages/pattern_intern')

    },

    pageConfig: async (req, res) => {

        res.render('pages/pattern_intern')
    },

    pageRanking: async (req, res) => {
        try {

            res.render('pages/pattern_intern')

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = pageController