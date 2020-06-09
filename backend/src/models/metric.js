const mongoose = require('mongoose')

const metricSchema = new mongoose.Schema({
    metric: {
        type: String,
        required: true
    },
    priority: {
        type: Number,
        default: 1,
        validate(value) {
            if(value < 0 || value > 5 || !Number.isInteger(value)) {
                throw new Error("Priority lies between 0 and 5.")
            }
        }
    }
})

const Metric = mongoose.model("Metric", metricSchema)

module.exports = Metric