const express = require('express')
const app = express();
const path = require('path')
const cors = require('cors')
require("dotenv").config();
const mongoose = require('mongoose')


const {logger, logEvents} = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler');
const corsOptions = require('./config/corsOption');
const cookieParser = require('cookie-parser')
const ConnectDb = require('./config/dbConnect')


const PORT = process.env.PORT || 9999

console.log(process.env.NODE_ENV)

ConnectDb()

app.use(logger)
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))
app.use('/auth', require("./routes/authRoute"))
app.use('/users', require("./routes/userRoutes"))
app.use('/notes', require("./routes/noteRoutes"))

app.all('*', (req, res) => {
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }else if (req.accepts('json')){
        res.json({message: "404 Not Found"})
    } else {
        res.type('txt').send('404 Not Found');
    }
})

app.use(errorHandler)


mongoose.connection.once("open", () => {
    console.log("Connected to MongoDb")
    app.listen(PORT, ()=> console.log(`Server is listening on port ${PORT}`))
  })

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})