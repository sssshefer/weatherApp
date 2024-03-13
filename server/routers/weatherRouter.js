const WeatherRouter = require('express')
const router = new WeatherRouter()
const controller = require('../controllers/controller')

router.post('/setWeatherInfo', controller.setData)
router.get('/getLastWeatherInfo', controller.getData)


module.exports = router