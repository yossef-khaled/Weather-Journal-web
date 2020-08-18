/* Global Variables */
const BASEURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const KEY = '&appid=fc98bc7d5f7ebf04332acfa29a2345c1'

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', startAction);

function startAction() {
    const cityZipCode = document.getElementById('zip').value;
    getWeatherData(BASEURL, cityZipCode, KEY)
}

const getWeatherData = async (baseURL, cityZipCode, key) => {
    const res = await fetch(baseURL+cityZipCode+key);
    try {
        const data = await res.json()
        return data;
    }
    catch(error) {
        console.log('Error !!', error);
    }
} 

const postWeatherData = async (url = '', data = {}) => {
    console.log(data);
    const responce = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        } ,
        body: JSON.stringify(data),
    });

    try {
        const recievedData = await responce.json();
        console.log(recievedData);
        return recievedData;
    }
    catch(error) {
        console.log("Error", error);
    }
}


postWeatherData('/addWeatherData', {test: 'Test'});