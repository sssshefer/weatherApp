import "dotenv/config";
import express from 'express';
import weatherRouter from './routers/weatherRouter.js';
import cors from 'cors';
import mongoose from 'mongoose';
import mqttMiddleware from './middleware/mqttMiddleware.js';

const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}));
app.use(weatherRouter)

app.get('/', (req, res) => {
    res.send('Server is running');
});

const start = async () => mongoose.connect(`mongodb://${process.env.DB_IP}:${process.env.DB_PORT}/${process.env.DB_NAME}`).then(() => {
    try {
        console.log("Database is connected successfully")
        app.listen(PORT, () => {
            console.log(`Server is started on port ${PORT}`);
        });
    } catch (e) {
        console.log(e)
    }
});

start()