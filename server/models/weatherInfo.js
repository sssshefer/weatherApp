const {Schema, model} = require('mongoose')

const WeatherInfo = new Schema({
    date: {type: Date, required: true},
    temperature: {type: String, required: true},
    humidity: {type: String, required: true},

})

module.exports = model('WeatherInfo', WeatherInfo)