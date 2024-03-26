#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>

// WiFi credentials
const char* WIFI_SSID = "MB210-G";
const char* WIFI_PASSWORD = "studentMAMK";

// MQTT broker details
const char* MQTT_BROKER = "172.20.49.25";
const int MQTT_PORT = 1883;
const char* MQTT_TOPIC = "test";

// Number of measurements to average
const int NUM_MEASUREMENTS = 10;

// DHT sensor pin
const int DHT_SENSOR_PIN = 26;

// Create instances for WiFi, MQTT client, and DHT sensor
WiFiClient espClient;
PubSubClient mqttClient(espClient);
DHT dhtSensor(DHT_SENSOR_PIN, DHT11);

// Arrays to store temperature and humidity values
float temperatureValues[NUM_MEASUREMENTS];
float humidityValues[NUM_MEASUREMENTS];
int measurementIndex = 0;

void setup() {
  Serial.begin(115200);
  dhtSensor.begin();
  delay(2000);
  setupWiFi();
  mqttClient.setServer(MQTT_BROKER, MQTT_PORT);
}

void loop() {
  float avgTemperature = 0;
  float avgHumidity = 0;

  // Reconnect to MQTT broker if not connected
  if (!mqttClient.connected()) {
    reconnect();
  }

  // Read temperature and humidity 10 times 
  for (int i = 0; i < NUM_MEASUREMENTS; i++) {
    temperatureValues[measurementIndex] = dhtSensor.readTemperature();
    humidityValues[measurementIndex] = dhtSensor.readHumidity();

    Serial.println(temperatureValues[measurementIndex]);
    Serial.println(humidityValues[measurementIndex]);
    
  //Average the temperature and humidity values
    avgTemperature += temperatureValues[measurementIndex];
    avgHumidity += humidityValues[measurementIndex];

    // Update the index for circular storage of measurements
    if (i == 9) {
      measurementIndex = (measurementIndex + 2) % NUM_MEASUREMENTS;
    } else {
      measurementIndex = (measurementIndex + 1) % NUM_MEASUREMENTS;
    }

    delay(1000);
  }

  mqttClient.loop();

  // Calculate the average temperature and humidity
  avgTemperature /= NUM_MEASUREMENTS;
  avgHumidity /= NUM_MEASUREMENTS;

  // Check if the values are valid and publish them to the MQTT broker
  if (!isnan(avgTemperature) && !isnan(avgHumidity)) {
    publishData(avgTemperature, avgHumidity);
  }

  delay(5000);  // Adjust as needed
}

void setupWiFi() {
  // Connect to WiFi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(250);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
}

void reconnect() {
  // Reconnect to the MQTT broker
  while (!mqttClient.connected()) {
    Serial.print("Attempting MQTT connection...");
    if (mqttClient.connect("ESP32Client")) {
      Serial.println("connected");
    } else {
      Serial.print("failed, rc=");
      Serial.print(mqttClient.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

void publishData(float temperature, float humidity) {
  // Prepare and publish the data in JSON format
  String payload = "{\"temperature\":" + String(temperature) + ",\"humidity\":" + String(humidity) + "}";
  mqttClient.publish(MQTT_TOPIC, payload.c_str());
}