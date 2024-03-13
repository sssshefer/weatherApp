const WeatherInfo = require("../models/weatherInfo");

class WeatherService {
    async saveRecord(temperature, humidity) {
        const weather = new WeatherInfo({
            temperature: temperature,
            humidity: humidity,
            date: new Date(),
        });
        await weather.save()
        return {weather}
    }
    async getLastRecord() {
        return WeatherInfo.findOne({}, {}, {sort: {'date': -1}})
    }
}

module.exports = new WeatherService();