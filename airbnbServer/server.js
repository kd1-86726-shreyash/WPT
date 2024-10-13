const express = require('express')
const utils = require('./utils');


const app = express();
app.use(express.json());
app.use((request, response, next) => {
    if (
        request.url === '/user/register' ||
        request.url === '/user/login' ||
        request.url == '/category' ||
        request.url.startsWith( '/bookings') ||
        request.url == '/property' ||
        request.url.startsWith('/property')||
        request.url.startsWith('/user/profile')) {
        next()
    }
    else {
        console.log("Sucess");
    }
})

const userRouter = require('./routes/user')
const categoryRouter = require('./routes/category')
const bookingsRouter = require('./routes/bookings')
const propertyRouter = require('./routes/property')

app.use('/user', userRouter)
app.use('/category' , categoryRouter)
app.use('/bookings' , bookingsRouter)
app.use('/property' , propertyRouter)

app.listen(9999, () => { console.log("Server Started At 9999") })