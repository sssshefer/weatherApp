<h1>🌿Weather App</h1>
<h2> MERN stack project  |  Arduino | MQTT | REST API </h2>

This project aims to use an Arduino to **monitor temperature and humidity**. It calculates the average values over a specified time and sends them to an MQTT server. A Node.js server **subscribes** to this MQTT server and displays the data, including date and time, to users via a React application.

The project includes a **REST API** for humidity and connects to a MongoDB database. The Node.js application follows a layered architecture pattern for better organization and scalability

> [!IMPORTANT]
> REST API sends real time data only when arduino sensors **and** MQTT server are active
