const fs = require('fs')
const ejs = require('ejs');
const path = require('path');
const { User: UserModel } = require('../models/user')

require('dotenv').config()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const pageController = {

    verification: async (req, res) => {
        try {

            res.render('pages/pattern.ejs')

        } catch (error) {
            console.log(error)
        }
    },
    pageIndex: async (req, res) => {
        try {

            res.render('index')

        } catch (error) {
            console.log(error)
        }
    },

    pageLogin: async (req, res) => {
        try {

            res.render('initial')

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

            const way = '../partials/user_profile'
            const script_way = "../scripts/profile/src/view-profile/interactor.js"

            res.render('pages/profile', { way: way, script_way: script_way })

        } catch (error) {
            console.log(error)
        }
    },

    pagePersonalization: async (req, res) => {
        try {

            if (req.query.type) {

                const way = `../partials/personalization_${req.query.type}`
                const script_way = `../scripts/profile/src/view-personalization/personalization_${req.query.type}.js`

                res.render('pages/profile', { way: way, script_way: script_way })

            }
            else {

                const way = '../partials/personalization_profile'
                const script_way = "../scripts/profile/src/view-personalization/interactor.js"

                res.render('pages/profile', { way: way, script_way: script_way })
            }

        } catch (error) {
            console.log(error)
        }
    },

    pageStatistic: async (req, res) => {

        const way = '../partials/statistic_profile'
        const script_way = "../scripts/profile/src/view-statistic/interactor.js"

        res.render('pages/profile', { way: way, script_way: script_way })

    },

    pageConfig: async (req, res) => {

        const way = '../partials/configurations_profile'
        const script_way = "../scripts/profile/src/view-config/interactor.js"

        res.render('pages/profile', { way: way, script_way: script_way })
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