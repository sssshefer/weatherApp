require('dotenv').config()
//const mqtt = require("./services/mqtt");
const express = require('express')
const weatherRouter = require('./routers/weatherRouter')
const cors = require('cors');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())
//app.use(mqtt);
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}));
app.use(weatherRouter)

app.get('/', (req, res) => {
    res.send(
        `Server is running`
    );
});

const start = async () => mongoose.connect(`mongodb://${process.env.DB_IP}:${process.env.DB_PORT}/${process.env.DB_NAME}`).then(() => {
    try {
        console.log("Database connected successfully")
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    } catch (e) {
        console.log(e)
    }
});

start()