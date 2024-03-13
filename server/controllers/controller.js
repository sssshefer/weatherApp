const WeatherService = require('../services/WeatherService');

class controller {
    async setData(req, res, next) {

        const mqttMessage = req.body.message;
        const {temperature, humidity} = JSON.parse(mqttMessage);

        try {
            const weatherInfo = await WeatherService.saveRecord(temperature, humidity);
            res.status(200).json({
                success: true,
                message: "Weather info successfully saved to DB!",
                weatherData: weatherInfo,
            });
        } catch (e) {
            res.status(400).json({
                success: false,
                message: e.message,
            });
        }
    }

    async getData(req, res, next) {
        try {
            const lastRecord = await WeatherService.getLastRecord()

            if (!lastRecord) {
                res.status(200).json({
                    success: false,
                    message: "No records found in the database",
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: "Weather info found successfully !",
                    data: lastRecord,
                });
            }
        } catch (e) {
            res.status(400).json({
                success: false,
                message: e.message,
            });
        }
    }
}

module.exports = new controller()