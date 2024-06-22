const { User: UserModel } = require('../models/user')
const { Statistic: StatisticModel } = require('../models/statistic')
const { rankingController } = require('./rankingController')
const { verifyTasksFromUser } = require('./rankingController')

const statisticController = {
    get: async (req, res) => {
        try {

            const id = req.userId

            const user = await UserModel.findById(id)

            if (!user) {
                res.status(404).json({ msg: "Usúario não encontrado" })
                return
            }

            res.json(user.statistic)

        } catch (error) {
            console.log(error)
        }
    },

    new_update: async (req, res) => {

        try {
            
            const userId = req.userId
            const priority = req.params.priority
            const update = req.body.update

            const user = await UserModel.findById(userId)

            if (!user) {

                res.status(404).json({ msg: "Usúario não encontrado" })
                return

            }

            change_statictic(user, priority, update)
            
            verifyTasksFromUser(user, update, priority)

            res
                .status(200)
                .json( { msg: "Estatística alterada com sucesso" })

        } catch (error) {
            console.log(error)
        }
    }
}

function change_statictic(user, priority, update){ 

    try{

        user.statistic[priority][update] += 1
        user.persistStatistic[update] += 1

        user.save()
    }
    catch(error){
        console.log(error)
    }

}

module.exports = statisticController 