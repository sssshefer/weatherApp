import cl from './App.module.css';
import {useEffect, useState} from "react";
import {fetchWeatherInfo, postWeatherInfo} from "../shared/api/api";

function App() {
    const [inputValue, setInputValue] = useState({})
    const [temperature, setTemperature] = useState('')
    const [humidity, setHumidity] = useState('')
    const [date, setDate] = useState('')

    useEffect(() => {
        refreshData()
    }, [])

    async function refreshData() {
        const fetchedData = await fetchWeatherInfo()
        console.log(fetchedData)
        if(!fetchedData){
            setTemperature('No data')
            setHumidity('No data')
        }else{
            setTemperature(fetchedData.temperature)
            setHumidity(fetchedData.humidity)
        }

        const creationDate = new Date(fetchedData.date)
        setDate(creationDate.toLocaleDateString() + ' ' + creationDate.toLocaleTimeString())
    }

    async function handleSendData(data) {
        await postWeatherInfo(data)
    }

    return (
        <div className={cl.wrap}>
            <div className={cl.weatherInfoCard}>
                <div className={cl.titleWrap}>
                    <h1 className={cl.title}>Weather Info</h1>

                </div>
                <table>
                    <tbody>
                    <tr>
                        <th>Temperature:</th>
                        <th>{temperature} &#8451; </th>
                    </tr>
                    <tr>
                        <th>Humidity:</th>
                        <th>{humidity} %</th>
                    </tr>
                    <tr></tr>
                    <tr>
                        <th>Date:</th>
                        <th>{date.split(' ')[0]}</th>
                    </tr>
                    <tr>
                        <th>Time:</th>
                        <th>{date.split(' ')[1]}</th>
                    </tr>
                    </tbody>

                </table>
                <button onClick={() => refreshData()} className={cl.focusButton}>
                    Refresh
                </button>
            </div>
            <div className={cl.inputWrap}>
                <input type="text" onChange={(e) => setInputValue(e.target.value)}/>
                <button onClick={() => handleSendData(inputValue)} className={cl.focusButton}>
                    (Test) Send data to server
                </button>
            </div>

        </div>
    );
}

export default App;
