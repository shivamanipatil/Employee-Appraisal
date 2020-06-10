const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const managerRouter = require('./routers/manager')
const employeeRouter = require('./routers/employee')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
const port = process.env.PORT
app.use(cors())

app.use(express.json())
app.use(morgan('tiny'))
app.use(userRouter)
app.use(managerRouter)
app.use(employeeRouter)

app.listen(port, () => {
    console.log("Server is on port : ", port)
})
