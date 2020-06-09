const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const {ROLE, authRole} = require('../middleware/role')
const Metric = require('../models/metric')
const Review = require('../models/review')

router.get('/reviews', auth, authRole(ROLE.EMPLOYEE), async (req, res) => {
    try {
        const reviews = await Review.find({employee: req.user._id})
        res.send(reviews)
    } catch(e) {
        res.status(400).send(e)
    }
})


module.exports = router