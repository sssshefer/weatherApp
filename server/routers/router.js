const Router = require('express')
const router = new Router()
const controller = require('../controllers/controller')

router.post('/setData', controller.setData)
router.get('/getData', controller.getData)


module.exports = router