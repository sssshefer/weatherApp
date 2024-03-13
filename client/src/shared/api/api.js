export const fetchWeatherInfo = async () => {
    const response =  await fetch(process.env.REACT_APP_LOCAL_SERVER_API + '/getLastWeatherInfo')
    const data = await response.json()
    return data.data;
}

export const postWeatherInfo = async (data) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message:JSON.stringify({humidity: data, temperature:data}) })
    };
    const response =  await fetch(process.env.REACT_APP_LOCAL_SERVER_API + '/setWeatherInfo', requestOptions)
    return await response.json()
}