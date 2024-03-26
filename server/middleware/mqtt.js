import mqtt from 'mqtt';
import axios from 'axios';

const mqttServer = "mqtt://172.20.49.25"
const topic = "test"
const port = 5000


let client;
try {
    client = mqtt.connect(mqttServer, {
        clientId: 'bgtestnodejs',
        protocolId: 'MQIsdp',
        protocolVersion: 3,
        connectTimeout: 1000,
        debug: true
    });
    console.log("Connected to MQTT server step 1")
} catch (e) {
    console.log("Error connecting to MQTT server", e.message)
}


client.on("connect", () => {
    console.log("Connected to MQTT server step 2")
    client.subscribe(topic, (err) => {
        if (!err) {
            client.publish(topic, "MQTT server is connected successfully");
        } else {
            console.log("Error subscribing to MQTT server")
        }
    });
});

client.on("message", (topic, message) => {
    //console.log(message.toString());
    console.log(33344)
    saveMessageToApi(message.toString());

    //client.end();
});

async function saveMessageToApi(message) {
    try {

        const response = await axios.post(`http://localhost:${port}/setWeatherInfo`, {message:message})
        console.log("Message saved successfully to API")
    } catch (e) {
        console.error("Error saving message:", e.message);
    }
}

export default client;
