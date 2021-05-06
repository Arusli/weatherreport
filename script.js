//Dom variables
const cityInput = document.querySelector(".city-input");
const stateInput = document.querySelector(".state-input")
const button = document.querySelector(".button");
let h1 = document.querySelector("h1");
let h2 = document.querySelector('h2');
let hold

function refreshInputFields() {
    cityInput.value = '';
    stateInput.value = '';
}

// API template
// https://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={your api key}
// https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={your api key}

// API variables
const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = '3c3ef70f976ee67df3739b2782ffff6c';
const apiKeyString = '&appid=' + apiKey;
const countryCode = 'us';


// Old code from before i had a pre-filtered us city list
// callback function for cityList.filter
// function getCountry(obj) {
//     return obj.country == 'US';
// }

// //Filters a new list of cities in the US
// let UsCities = cityList.filter(getCountry);
// console.log(UsCities);


// This function checks that City and State exist in the same element of the array, aka the city exists in the state.
// we need to check that there is an element/object in the array that contains both city and state, before returning the json object.
function checkCityExists(){
    for (i=0; i<UsCities.length; i++) {
        if (UsCities[i].name.toUpperCase() == cityInput.value.toUpperCase() && UsCities[i].state.toUpperCase() == stateInput.value.toUpperCase()) {
            return true;
        }
    }
    return false;
} //end checkCityExists

// Fetch API function
function makeRequest() {
    //why can't I have these consts outside?
    const queryString = '?q=' + cityInput.value + ',' + stateInput.value + ',' + countryCode + '&units=imperial';
    const endpoint = url + queryString + apiKeyString;
    //
    try{
        hold = checkCityExists()
        console.log('city exists? : ' + hold);
        console.log(endpoint);
        fetch(endpoint)
        .then((response) => {
            return response.json();
        })
       .then((data) => {
            if (data.cod === 200 && states.includes(stateInput.value.toUpperCase()) && checkCityExists()) {
                console.log(data);
                h2.innerHTML = data.name + ', ' + stateInput.value.toUpperCase() + '<br>' + Math.floor(data.main.temp) + '\xB0F' + '<br>' + data.weather[0].description;
                refreshInputFields();
            } else {
                console.log(data);
                h2.innerHTML = 'City not found.'
                refreshInputFields();
            }
         }) 
        }
    catch(e) {
        console.log(e);
        h2.innerHTML = e;
    }
  } //end of makeRequest()

// Original working code backup
// fetch(endpoint)
// .then(response => response.json())
// .then((data) => {
//     console.log(data);
//     h2.innerHTML = data.name + ', ' + inputField.value + '<br>' + Math.floor(data.main.temp) + ' degrees' + '<br>' + data.weather[0].description;
//     inputField.value = '';
//     });

// Event Listener
document.addEventListener("keydown", (e) => {
    if (e.keyCode === 13 && cityInput.value !== '' && stateInput.value !== '') {
        makeRequest();     
    }
})