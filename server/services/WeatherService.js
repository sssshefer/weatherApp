import WeatherInfo from '../models/weatherInfo.js'

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

export default new WeatherService();