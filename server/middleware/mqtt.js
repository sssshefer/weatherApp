const mqtt = require("mqtt");
const axios = require("axios");

const mqttServer = "172.20.49.38"
const topic = "test"
const port = 5000

let client;
try {
    client = mqtt.connect(mqttServer);
} catch (e) {
    console.log("Error connecting to MQTT server", e.message)
}

client.on("connect", () => {
    client.subscribe(topic, (err) => {
        if (!err) {
            client.publish(topic, "MQTT server connected successfully");
        } else {
            console.log("Error subscribing to MQTT server")
        }
    });
});

client.on("message", (topic, message) => {
    // message is Buffer
    //console.log(message.toString());
    saveMessageToApi(message.toString());

    //client.end();
});

async function saveMessageToApi(message) {
    try {
        const response = await axios.post(`http://localhost:${port}/setData`, {message})
        console.log("Message saved successfully to API")
    } catch (e) {
        console.error("Error saving message:", e.message);
    }
}

module.exports = client;