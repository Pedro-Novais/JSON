const { User: UserModel } = require('../models/user')
const { Ranking: RankingModel } = require('../models/ranking')
const mongoose = require('mongoose');

const rankingController = {
    verifyTasksFromUser: async (user) => {

        const qntUsersInRanking = await RankingModel.find()
        console.log(qntUsersInRanking.length)

        if(qntUsersInRanking.length == 0){

            const newUserRanking = createUserinRanking(user, 1)

            await RankingModel.create(newUserRanking)

            return true
        }

        const userId = user._id

        if(qntUsersInRanking.length > 0 ){ 

            const BeInRanking = await RankingModel.findOne({ userId });

            console.log(BeInRanking)
        }

    }
}

function createUserinRanking(user, positionRanking = null){

    const data = {
        userId: user._id,
        position: positionRanking,
        nameUser: user.name,
        tasksCreated: user.persistStatistic.taskCreated,
        tasksFinished: user.persistStatistic.taskFinished,
        tasksCanceled: user.persistStatistic.taskCanceled
    }

    return data
}

module.exports = { rankingController }