const { User: UserModel } = require('../models/user')
const { Ranking: RankingModel } = require('../models/ranking')
const mongoose = require('mongoose');

const rankingController = {
    verifyTasksFromUser: async (user, operation) => {

        if (operation !== "finished") {

            return false

        }

        const insert = "insert"
        const update = "update"

        const usersFromRanking = await RankingModel.find()

        if (usersFromRanking.length == 0) {

            const newUserRanking = new UserRanking(user, 1)

            await RankingModel.create(newUserRanking)

            return true
        }

        const userId = user._id

        let beInRanking = await RankingModel.findOne({ userId });

        if (beInRanking) {

            const position = beInRanking.position
            const updateUserRanking = new UserRanking(user, position)

            await RankingModel.findByIdAndUpdate(beInRanking._id, updateUserRanking)

            if (position == 1) {

                return true

            } else {

                reorganizeRanking(usersFromRanking, beInRanking, update)

                return true
            }
        }

        if (!beInRanking) {

            reorganizeRanking(usersFromRanking, user, insert)

        }
    }
}

async function reorganizeRanking(allUser, userMoment, operation) {

    if (operation == "insert") {

        const numberPosition = allUser.length
        const newPosition = numberPosition + 1

        const user = new UserRanking(userMoment, newPosition)

        await RankingModel.create(user)

        return true
    }

    else if (operation == "update") {

        verifyPosition(userMoment)
    }

}

function getUserHigh(ranking, position) {

    let searchPosition = position - 1
    for (let i = 0; i < ranking.length; i++) {

        if (ranking[i].position == searchPosition) {

            return i
        }
    }
}

async function verifyPosition(userUpdated) {

    const rankingQuery = RankingModel.find().sort({ position: 1 });
    const ranking = await rankingQuery.exec();

    if (userUpdated.position == 1) {

        return false

    }

    const positionUser = userUpdated.position

    const userHigh = ranking[positionUser - 2]

    let stop = 0;

    let positionsNew;

    do{
        let state;

        state = changingPosition(userHigh, userUpdated)
        
        if(state == 1){

            break

        }

        if(state == 2){ 

            positionsNew = switchPosition(userHigh, userUpdated)

        }

        if(state == 3){

            console.log('mesma quantidade')

        }

        stop = state
    }
    while(stop != 1)
}

async function switchPosition(lastUserHigh, newUserHigh){
    try {
        
        const positionHigh = lastUserHigh.position
        const positionDowm = newUserHigh.position

        lastUserHigh.position = 0
        await lastUserHigh.save()

        newUserHigh.position = positionHigh
        await newUserHigh.save()

        lastUserHigh.position = positionDowm
        await lastUserHigh.save()

        return positionHigh

    } catch (error) {
        console.log(error)
    }

}

function changingPosition(userHigh, user) {

    if (userHigh.tasksFinished > user.tasksFinished) {

        console.log('permanece na posição')
        return 1

    } else if (userHigh.tasksFinished < user.tasksFinished) {

        console.log('sobe uma posição')
        return 2

    }
    else if (userHigh.tasksFinished == user.tasksFinished) {

        console.log('criterio de desempate')
        return 3

    }


}

class UserRanking {

    constructor(user, positionRanking = 0) {

        this.userId = user._id;
        this.position = positionRanking;
        this.nameUser = user.name;
        this.tasksCreated = user.persistStatistic.taskCreated;
        this.tasksFinished = user.persistStatistic.taskFinished;
        this.tasksCanceled = user.persistStatistic.taskCanceled;

    }
}

module.exports = { rankingController }