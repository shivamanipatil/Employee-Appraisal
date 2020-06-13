const mongoose = require('mongoose')
const {ROLE} = require('../middleware/role')

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true  
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    designation: {
        type: String,
        enum : [ROLE.EMPLOYEE,ROLE.MANAGER],
        required: true
    },
    ratings: [{
        type: Number,
        required: true,
        validate(value) {
            if(value < 0 || value > 5 || !Number.isInteger(value)) {
                throw new Error("Rating lies between 0 and 5.")
            }
        }
    }]      
})

const Review = mongoose.model("Review", reviewSchema)

module.exports = Review