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

        const beInRanking = await RankingModel.findOne({ userId });

        if (beInRanking) {

            const position = beInRanking.position
            const updateUserRanking = new UserRanking(user, position)

            if (position == 1) {

                await RankingModel.findByIdAndUpdate(beInRanking._id, updateUserRanking)

                return true

            } else {

                await RankingModel.findByIdAndUpdate(beInRanking._id, updateUserRanking)

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

    else if(operation == "update"){
        
        //const position = userMoment.position
        verifyPosition(userMoment)
    }

}

function getUserHigh(ranking, position){

    let searchPosition = position - 1
    for(let i = 0; i < ranking.length; i++){

        if(ranking[i].position == searchPosition){
            
            return i
        }
    }
}

async function verifyPosition(userUpdated){

    const ranking = await RankingModel.find()
    console.log(ranking[0].position)

    return true
    if(userUpdated.position == 1){

        return false

    }

    console.log('atualização')

    let index = userUpdated.position
    console.log(index)

    for(let i = index; i > 1; i--){

        const userHigh = ranking[index - 1]

        console.log(userHigh)

        /*if(userHigh.tasksFinished > userUpdated.taskFinished){

            console.log('permanece na posição')
            break

        }else if(userHigh.tasksFinished > userUpdated.taskFinished){

            break

        }
        else if(userHigh.tasksFinished < userUpdated.taskFinished){

            break
            
        }*/

    }
}

/*if(!lastUserinranking){

    return false

}

if(lastUserinranking.tasksFinished > userMoment.tasksFinished){
    console.log('aqui 1')
    //userMoment.position = sizeUsers + 1

    await RankingModel.findByIdAndUpdate(userMoment._id, userMoment)

    return true
    
}else if(lastUserinranking.tasksFinished < userMoment.tasksFinished){
    console.log('aqui 2')
    userMoment.position = sizeUsers
    lastUserinranking.position = sizeUsers + 1

    //await lastUserinranking.save()

    //definedPositions(allUser, userMoment)

    return true
    
}else if(lastUserinranking.tasksFinished == userMoment.tasksFinished){

    console.log('igual')

    return true

}
}*/

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