const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const {ROLE, authRole} = require('../middleware/role')
const Metric = require('../models/metric')
const Review = require('../models/review')

//POST /create/metric
router.post('/create/metric', auth, authRole(ROLE.MANAGER), async (req, res) => {
    try {
        const metric = new Metric({
            ...req.body,
        })
        await metric.save()
        res.status(201).send()
    } catch(e) {
        res.status(400).send(e) 
    }
})

//POST /reviews for a employee
router.post('/reviews', auth, async (req, res) => {
    try {
        const employee = await User.findById(req.body.employee)
        if(!req.user._id.equals(employee._id) && !req.user._id.equals(employee.manager._id)) {
            throw new Error("Not authorized")
        }
        const review = new Review({
            employee: req.body.employee,
            designation: req.user.role,
            ratings: req.body.ratings,
            metrics: req.body.metrics,
        })
        await review.save()
        res.status(201).send()
    } catch(e) {
        res.status(401).send(e) 
    }
})

//GET /subordinates
router.get('/subordinates', auth, authRole(ROLE.MANAGER), async (req, res) => {
    try {
        const subordinates = await User.find({manager: req.user._id, role: ROLE.EMPLOYEE})
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