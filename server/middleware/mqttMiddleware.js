import client from './mqtt.js'

const mqttMiddleware = (req, res, next) => {
    console.log("Mqtt middleware is executed");
    next();
};
export default mqttMiddleware;
