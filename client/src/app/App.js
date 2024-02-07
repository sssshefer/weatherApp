import cl from './App.module.css';
import {useEffect, useState} from "react";
import {fetchDataFromServer, sendDataToServer} from "../shared/api/api";

function App() {
    const [data, setData] = useState({})
    const [fetchedData, setFetchedData] = useState({})
    useEffect(() => {
        refreshDataFromServer()
    }, [])

    async function refreshDataFromServer() {
        const data = await fetchDataFromServer()
        setFetchedData(data)
    }

    async function handleSendDataToServer(data) {
        sendDataToServer(data)
    }

    return (
        <div className={cl.wrap}>
            <a onClick={() => refreshDataFromServer()}>
                Get new data from server
            </a>
            <div className={cl.dataWrap}>
                Last data from the server: <span className={cl.data}>{fetchedData.data}</span>
            </div>
            <a onClick={() => handleSendDataToServer(data)}>
                (Test) Send data to server
            </a>
            <input type="text" onChange={(e) => setData(e.target.value)}/>
        </div>
    );
}

export default App;
