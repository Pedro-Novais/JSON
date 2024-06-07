const { User: UserModel } = require('../models/user')
const { Ranking: RankingModel } = require('../models/ranking')
const mongoose = require('mongoose');

const rankingController = {
    
    get: async (req, res) => {
        try {

            const userId = req.userId
            let exist = false

            const rankingVerify = await RankingModel.find().limit(9).sort({ position: 1 })

            for (let i = 0; i < rankingVerify.length; i++) {

                if (rankingVerify[i].userId == userId) {

                    exist = rankingVerify[i].position

                    break
                }
            }

            const ranking = await RankingModel.find().limit(9).sort({ position: 1 }).select('-userId')

            res.status(201).json({ ranking, exist: exist })

        } catch (error) {
            console.log(error)
        }
    },

    viewProfile: async (req, res) => {
        try {

            class Profile {

                constructor(user) {

                    this.name = user.name
                    this.taskCreated = user.persistStatistic.created
                    this.taskFinished = user.persistStatistic.finished
                    this.taskCanceled = user.persistStatistic.canceled
                    this.description = user.description
                    this.date = user.createdAt
                    this.position = user.ranking
                }

            }

            const id_user = req.body.id

            const userRanking = await RankingModel.findById(id_user).populate('userId')

            if (!userRanking) {

                res
                    .status(401)
                    .json({ msg: "Úsuario não foi encontrado" })
            }

            const userIdSearch = userRanking.userId

            const user = new Profile(userIdSearch)

            res.status(201).json({ user })



        } catch (error) {
            console.log(error)
        }
    },

    searchUser: async (req, res) => {

        const userId = req.userId
        const search = req.body.search

        let exist = false

        const regex = new RegExp("^" + search, "i")

        const users = await RankingModel.find({nameUser: regex }).sort({ position: 1 })

        if(users.length == 0){

            res.status(404).json({msg: "Nenhum usuário encontrado"})
            
            return true
        }

        
        for (let i = 0; i < users.length; i++) {
            
            if (users[i].userId == userId) {

                exist = users[i].position

                break
            }
        }

        res.status(201).json({ranking: users, exist: exist})
    }
}

async function verifyTasksFromUser(user, operation) {

    if (operation !== "finished") {

        return false

    }

    const insert = "insert"
    const update = "update"

    const usersFromRanking = await RankingModel.find()

    if (usersFromRanking.length == 0) {

        const newUserRanking = new UserRanking(user, 1)

        await RankingModel.create(newUserRanking)

        const data = {
            ranking: 1
        }
        await UserModel.findByIdAndUpdate(newUserRanking.userId, data)

        return true
    }

    const userId = user._id

    let beInRanking = await RankingModel.findOne({ userId });

    if (beInRanking) {

        const position = beInRanking.position
        const updateUserRanking = new UserRanking(user, position)

        await RankingModel.findByIdAndUpdate(beInRanking._id, updateUserRanking)

        const userUpdatedFinished = await RankingModel.findOne({ userId });

        if (position == 1) {

            return true

        } else {

            reorganizeRanking(usersFromRanking, userUpdatedFinished, update)

            return true
        }
    }

    if (!beInRanking) {

        reorganizeRanking(usersFromRanking, user, insert)

    }
}

async function reorganizeRanking(allUser, userMoment, operation) {

    if (operation == "insert") {

        const numberPosition = allUser.length
        const newPosition = numberPosition + 1

        const user = new UserRanking(userMoment, newPosition)

        await RankingModel.create(user)

        const data = {
            ranking: newPosition
        }

        await UserModel.findByIdAndUpdate(user.userId, data)

        return true
    }

    else if (operation == "update") {

        verifyPosition(userMoment)
    }

}

async function verifyPosition(userUpdated) {

    const rankingQuery = RankingModel.find().sort({ position: 1 });
    const ranking = await rankingQuery.exec();

    if (userUpdated.position == 1) {

        return false

    }

    let stop = 0;

    let userHigh;

    let state = null;
    let positionsNew = null;

    do {

        if (state == 2) {

            userHigh = ranking[positionsNew.positionHigh - 2]
            state = changingPosition(userHigh, positionsNew.newUserHigh)

        } else {

            const positionUser = userUpdated.position
            userHigh = ranking[positionUser - 2]

            state = changingPosition(userHigh, userUpdated)
        }

        if (state == 1) {

            break

        }

        if (state == 2) {

            positionsNew = await switchPosition(userHigh, userUpdated)

            if (positionsNew.positionHigh == 1) {

                break
            }

        }

        if (state == 3) {

            break

        }

        stop = state
    }
    while (stop != 1)
}

async function switchPosition(lastUserHigh, newUserHigh) {
    try {

        const positionHigh = lastUserHigh.position
        const positionDowm = newUserHigh.position

        lastUserHigh.position = 0
        await lastUserHigh.save()

        newUserHigh.position = positionHigh
        await newUserHigh.save()

        const dataHigh = {
            ranking: positionHigh
        }
        await UserModel.findByIdAndUpdate(newUserHigh.userId, dataHigh)

        lastUserHigh.position = positionDowm
        await lastUserHigh.save()

        const dataDown = {
            ranking: positionDowm
        }
        await UserModel.findByIdAndUpdate(lastUserHigh.userId, dataDown)

        return { positionHigh, newUserHigh }

    } catch (error) {
        console.log(error)
    }

}

function changingPosition(userHigh, user) {

    if (userHigh.tasksFinished > user.tasksFinished) {

        return 1

    } else if (userHigh.tasksFinished < user.tasksFinished) {

        return 2

    }
    else if (userHigh.tasksFinished == user.tasksFinished) {

        return 3

    }

}

class UserRanking {

    constructor(user, positionRanking = 0) {

        this.userId = user._id;
        this.position = positionRanking;
        this.nameUser = user.name;
        this.tasksCreated = user.persistStatistic.created;
        this.tasksFinished = user.persistStatistic.finished;
        this.tasksCanceled = user.persistStatistic.canceled;

    }
}

module.exports = { rankingController, verifyTasksFromUser }