require('dotenv').config()
const express = require('express')
const router = require('./routers/router')
const cors = require('cors');

const PORT = process.env.PORT || 5000
const app = express()


app.use(express.json())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}));
app.use(router)

app.get('/', (req, res) => {
    res.send(
        `Server is running on port ${PORT}`
    );
});

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()