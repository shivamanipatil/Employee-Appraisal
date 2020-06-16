const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const {ROLE, authRole} = require('../middleware/role')
const Review = require('../models/review')

//GET /api/subordinates
router.get('/api/subordinates', auth, authRole(ROLE.MANAGER), async (req, res) => {
    try {
        const subordinates = await User.find({manager: req.user._id, role: ROLE.EMPLOYEE}, "name email _id role")
        res.send(subordinates)
    } catch(e) {
        res.status(400).send(e)
    }
})

//POST /api/add/subordinate
router.get('/api/add/subordinate', auth, authRole(ROLE.MANAGER), async (req, res) => {
    try {
        const user = User.findById(req.body.employee)
        user.manager = req.user._id
        user.save()
        res.send()
    } catch (e){
        res.status(400).send(e)
    }
})

module.exports = router