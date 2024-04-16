const { User: UserModel } = require('../models/user')
const { Ranking: RankingModel } = require('../models/ranking')
const mongoose = require('mongoose');

const rankingController = {
    verifyTasksFromUser: async (user, operation) => {

        if(operation !== "finished"){

            return false

        }
      
        const usersFromRanking = await RankingModel.find()

        if(usersFromRanking.length == 0){

            const newUserRanking = new UserRanking(user, 1)

            await RankingModel.create(newUserRanking)

            return true
        }

        const userId = user._id

        if(usersFromRanking.length > 0 ){ 

            const beInRanking = await RankingModel.findOne({ userId });

            if(beInRanking){
              
                const position = beInRanking.position
                const updateUserRanking = new UserRanking(user, position)

                //await RankingModel.findByIdAndUpdate(beInRanking._id, updateUserRanking)

                const response = reorganizeRanking(usersFromRanking, updateUserRanking, true)

                if(response == "first"){

                    await RankingModel.findByIdAndUpdate(beInRanking._id, updateUserRanking)

                }
            }

            if(!beInRanking){

                const newUserRanking = new UserRanking(user)

                reorganizeRanking(usersFromRanking, newUserRanking)
                
            }   
        }
    }
}

async function reorganizeRanking(allUser, userMoment, exist = false ){

    const sizeUsers = allUser.length
    let lastUserinranking = null

    if(exist){
        
        if(userMoment.position == 1){

            console.log('Já está na primeira posição')

            return "first"

        }else{

            console.log('não está na primeira posição e está atrás de ')

            const position = userMoment.position - 1
            //lastUserinranking = await RankingModel.findOne({ position: position });

            console.log(lastUserinranking)

        }

    }else{

        lastUserinranking = await RankingModel.findOne({ position: sizeUsers });

        console.log('não existe na tabela, está atrás de:')
        console.log(lastUserinranking)


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

    }*/
}

async function definedPositions(allUser, userMoment){

    if(userMoment.position == 1){

        await RankingModel.create(userMoment)
        console.log('criou')

    }

}

class UserRanking{

    constructor(user,  positionRanking = 0){

        this.userId = user._id;
        this.position = positionRanking;
        this.nameUser = user.name;
        this.tasksCreated = user.persistStatistic.taskCreated;
        this.tasksFinished = user.persistStatistic.taskFinished;
        this.tasksCanceled = user.persistStatistic.taskCanceled;

    }
}

module.exports = { rankingController }