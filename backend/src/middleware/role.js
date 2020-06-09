const ROLE = {
    MANAGER: 'manager',
    EMPLOYEE: 'employee'
}

const authRole = (role) => {
    return (req, res, next) => {
        if(req.user.role !== role) {
            return res.status(401).send('Not allowed')
        }
        next()
    }
}

module.exports = {
    ROLE,
    authRole
}