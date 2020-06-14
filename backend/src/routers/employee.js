const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const {ROLE, authRole} = require('../middleware/role')
const Review = require('../models/review')

//Employee can add who is their manager
router.post('/api/addManager', auth, authRole(ROLE.EMPLOYEE), async (req, res) => {
    try {
        req.user.manager = req.body.managerId
        req.user.save()
        res.send()
    } catch (e) {
        res.status(400).send()
    }
})

//Both manager and empoyee can access 
router.get('/api/reviews', auth, async (req, res) => {
    try {
        let reviews;
        //if employee then self reviews else manager reviews
        if(req.user.role === ROLE.EMPLOYEE) {
            reviews = await Review.find({employee: req.user._id})
        } else {
            console.log(req.user._id)
            reviews = await Review.find({givenBy: req.user._id, designation: ROLE.MANAGER})
            console.log(reviews)
        }
        res.send(reviews)
    } catch(e) {
        res.status(400).send(e)
    }
})

//POST /reviews for a employee by self or manager 
router.post('/api/reviews', auth, async (req, res) => {
    try {
        const employee = await User.findById(req.body.employee)
        if(!req.user._id.equals(employee._id) && !req.user._id.equals(employee.manager._id)) {
            throw new Error("Not authorized")
        }
        const review = new Review({
            name: req.body.name,
            employee: req.body.employee,
            designation: req.user.role,
            ratings: req.body.ratings,
            givenBy: req.user._id,
            employeeName: req.user.role === ROLE.EMPLOYEE ? req.user.name : req.body.employeeName
        })
        await review.save()
        res.status(201).send()
    } catch(e) {
        res.status(401).send(e) 
    }
})

//Both manager and empoyee can delete their reviews
router.delete('/api/reviews/:id', auth, async (req, res) => {
    try {
        const review = await Review.findOneAndDelete({_id:req.params.id, givenBy: req.user._id})
        if(!review) {
            return res.status(404).send()
        }
        res.send(review)
    } catch(error) {
        res.status(500).send(error)
    }
})

//Both manager and empoyee can update their reviews 
router.patch('/api/reviews/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdate = ['ratings', 'name']
    const validOperation = updates.every((update) => allowedUpdate.includes(update))
    if(!validOperation) {
        return res.status(400).send({error : "Invalid update operation"})
    }
    try {
        const review = await Review.findOne({_id: req.params.id, givenBy: req.user._id})
        if(!review) {
            return res.status(404).send()
        }
        updates.forEach(function(update) {
            review[update] = req.body[update]
        })
        await review.save()    
        res.send(review)
    } catch (error) {
        res.status(400).send(error)
    }
})
module.exports = router