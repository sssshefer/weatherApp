import WeatherRouter from 'express'
import controller from '../controllers/controller.js';
const router = new WeatherRouter()

router.post('/setWeatherInfo', controller.setData)
router.get('/getLastWeatherInfo', controller.getData)


export default router;