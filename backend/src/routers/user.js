const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const {ROLE, authRole} = require('../middleware/role')

router.get('/profile', auth, async (req, res) => {
    console.log(req.user)
    if(req.user.role == ROLE.EMPLOYEE && req.user.MANAGER !== null) {
        let manager = await User.findById({_id: req.user.manager})
        const user = req.user.toObject()
        user.managerName = manager.name    
        return res.send(user)
    }
    res.send(req.user)
})

router.post('/api/register', async (req, res) => {
    console.log(req.body)
    const user = new User(req.body)
    
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch(e) {
        res.status(400).send(e)
    }
})

router.post('/api/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})        
    } catch(e) {
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch(e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch(e) {
        res.status(500).send(e)
    }
})
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch(error) {
        res.status(500).send(error)
    }
})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdate = ['name', 'email', 'password', 'age']
    const validOperation = updates.every((update) => allowedUpdate.includes(update))
    
    if(!validOperation) {
        return res.status(400).send({error: "Invalid operation"})
    }
    try {
        const user = req.user
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        res.send(user)
    } catch(error) {
        res.status(400).send(error)
    } 
})

//test manager route
router.get('/manager', auth, authRole(ROLE.MANAGER), (req, res) => {
    res.send('Hi manager')
})

module.exports = router