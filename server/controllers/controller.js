import WeatherService from '../services/WeatherService.js';

class controller {
    async setData(req, res, next) {
        if (req.body.message === 'MQTT server is connected successfully') {
            console.log('First message is sent successfully')
            return next()
        }

        const {temperature, humidity} = req.body.message;

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
                data: 'error'
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
                    message: "Weather info found successfully!",
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

export default new controller();