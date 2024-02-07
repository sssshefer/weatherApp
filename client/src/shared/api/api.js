

export const fetchDataFromServer = async () => {
    const response =  await fetch(process.env.REACT_APP_LOCAL_SERVER_API + '/getData')
    const data = await response.json()
    return data;
}

export const sendDataToServer = async (data) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data:data })
    };
    const response =  await fetch(process.env.REACT_APP_LOCAL_SERVER_API + '/setData', requestOptions)
    const json = await response.json()
    return json;
}