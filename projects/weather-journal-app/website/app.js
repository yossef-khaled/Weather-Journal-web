/* Global Variables */
const BASEURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const KEY = '&appid=fc98bc7d5f7ebf04332acfa29a2345c1'

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


console.log(document.getElementById('entryHolder'));
document.getElementById('generate').addEventListener("click", startAction);

function startAction(e) {
    const cityZipCode = document.getElementById('zip').value;
    const userEntry = document.getElementById('feelings').value;
    getWeatherData(BASEURL, cityZipCode, KEY)
    .then(function(data){   
        postWeatherData('/addWeatherData', 
        {date: newDate,
         temp: data.main.temp,
         content: userEntry   
        })
    })
    .then(updateUI());
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
    //console.log(data);
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

const updateUI = async () => {
    const retrievedData  = await fetch('/getWeatherData');
    try {
        const uiData = await retrievedData.json();
        console.log(uiData);
        document.getElementById('date').innerHTML = uiData.date;
        document.getElementById('temp').innerHTML = uiData.temp;
        document.getElementById('content').innerHTML = uiData.content;
    }
    catch(error) {
        console.log('Error !!!', error);
    }
}