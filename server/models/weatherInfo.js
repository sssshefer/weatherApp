import mongoose from "mongoose";

const WeatherInfoSchema = new mongoose.Schema({
    date: {type: Date, required: true},
    temperature: {type: String, required: true},
    humidity: {type: String, required: true},

})

export default mongoose.model('WeatherInfo', WeatherInfoSchema)