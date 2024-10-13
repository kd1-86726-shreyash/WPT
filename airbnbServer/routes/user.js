//Express is web server 
const express = require('express');
const db = require('../db');
const utils = require('../utils');
const jwt = require('jsonwebtoken');
const config = require('../config')

//To track user track(resgiter , login , )
// router is request to server
// router is instance of express
const router = express.Router()

router.put('/profile/:userId',(request,response)=>{
    const{ firstName , lastName , phone} = request.body
    const statement = `update user set firstName = ? , lastname = ?, phonenumber = ? where id = ?`
    db.pool.execute(
        statement,
        [firstName , lastName , phone , request.params.userId],
        (error,result)=>{
            response.send(utils.createResult(error,result))
        }
    )
})

router.get('/profile/:userId', (request,response)=>{
    const statement = `select firstName , lastName , phoneNumber , email from user where id = ?`
    db.pool.execute(statement,[request.params.userId],
        (error,result)=>{
            response.send(utils.createResult(error,result))
        }
    )
})

router.post('/register', (request, response) => {
    const { firstName, lastName, email, password, phone } = request.body;

    const statement = `insert into user (firstName, lastName, email, password, phoneNumber) values
    (?,?,?,?,?);`

    db.pool.execute(
        statement,
        [firstName, lastName, email, password, phone],
        (error, result) => {
            response.send(utils.createResult(error, result))
        }
    )
})


router.post('/login', (request, response) => {
    const { email, password } = request.body
    const statement =  `select  id , firstName , lastName , phoneNumber , isDeleted from user 
    where email = ? and password = ?`

    db.pool.query(statement, [email, password], (error, users) => {
        if (error) {
            repsone.send(utils.createErrorResult(error))
        } else {
            if (users.length == 0) {
                repsone.send(utils.createErrorResult("User Doesnt exits !"))
            } else {
                const user = users[0]
                if (user.isDeleted) {
                    repsone.send(utils.createErrorResult("Your Account Is Closed"))
                } else {
                    const payload = {id:user.id}
                    const token = jwt.sign(payload,config.secret)

                    const userData = {
                        token,
                        name : `${user['firstName']} ${user['lastName']} `,
                    }
                    response.send(utils.createSuccessResult(userData))
                }
            }
        }
    })
})

router.get('/register', (request, response) => {

    const statement = `select * from user;`

    db.pool.execute(
        statement,
        (error, result) => {
            response.send(utils.createResult(error, result))
        }
    )
})

module.exports = router;
