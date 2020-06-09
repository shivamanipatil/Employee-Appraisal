const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const managerRouter = require('./routers/manager')
const employeeRouter = require('./routers/employee')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(managerRouter)
app.use(employeeRouter)

app.listen(port, () => {
    console.log("Server is on port : ", port)
})
