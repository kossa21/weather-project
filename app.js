// -------------------------------------- INITIAL VARIABLES -------------------------------------------//

const key = "83e8b55d60e04f909b496e837fe8b54c";

const cities = [];
cities.push({
    name: "Caracas",
    latitude: 10.500000,
    longitude: -66.916664
});
cities.push({
    name: "Toronto",
    latitude: 40.46423,
    longitude: -80.60091
});
cities.push({
    name: "Estambul",
    latitude: 41.01384,
    longitude: 28.94966
});
cities.push({
    name: "Florencia",
    latitude: 43.77925,
    longitude: 11.24626
});
cities.push({
    name: "Barcelona",
    latitude: 41.392175,
    longitude: 2.164893
});
cities.push({
    name: "Paris",
    latitude: 48.856788,
    longitude: 2.351077
});

const mapMarkers = [];


//---------------------------------------- FUNCTIONS START HERE ----------------------------------------//

const get = (latitude, longitude) => {
    //This function will run the fetch given a latitude and a longitude

    const url = `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${key}&lang=es`;

    fetch(url)
    .then(response => response.json())
    .then(data => renderWeather(data))
    .catch(error => onError(error));
} 


const renderArray = arr => {
    console.log("I entered renderArray and I have the following value for arr ", arr);
    //This function will run the get function in all of the cities of the array it receives as a parameter

    removeCurrentCards();
    
    arr.forEach(el => {
        get(el.latitude, el.longitude);

        var marker = new mapboxgl.Marker()
        .setLngLat([el.longitude, el.latitude])
        .addTo(map);
        
        mapMarkers.push(marker);
    })
}

const removeCurrentCards = () => {
    //This function will remove all of the existent cards 

    const currentCards = document.querySelectorAll(".weatherCard");
    currentCards.forEach(el => el.remove());

    mapMarkers.forEach(el => {el.remove()});
    mapMarkers.length = 0;
}


const filterCities = () => {
    //This function will filter the cities array based on if the name of the city contains what the user writes in the input

    const searchString = document.querySelector("input").value.toLowerCase();
    const filteredArray = cities.filter(el => el.name.toLowerCase().includes(searchString));

    renderArray(filteredArray);
}


const onError = error => {
    //This function will handle errors

    console.error(error);
}


const renderWeather = json =>{
    //This function will take the converted json from the api, take the relevant information and call createCard function
    console.log(json);

    const city = json.data[0].city_name + ", " + json.data[0].country_code;
    const temperature = json.data[0].temp;
    const icon = "img/icons/" + json.data[0].weather.icon + ".png";
    const description = json.data[0].weather.description;

    createCard(city, temperature, icon, description);
}


const createCard = (city, temperature, icon, description, error) => {
    //This function will create a HTML element for a card and show the given information: 
    //If the fetch ran correctly (the parameter error === false) it will show the name of the city, the current temperature, a description of the weather and an icon 
    //If the fetch did not ran correctly (the parameter error === true) it will show dashes and a red message

    const card = document.createElement("div");
    card.className = "weatherCard";
    document.querySelector("#weatherCards").appendChild(card);

    const cityEl = document.createElement("h2");
    cityEl.className = "cityName";
    card.appendChild(cityEl);

    const iconEl = document.createElement("img");
    iconEl.className = "icon";
    card.appendChild(iconEl);

    const tempEl = document.createElement("h1");
    tempEl.className = "temperature";
    card.appendChild(tempEl);

    const descriptionEl = document.createElement("p");
    descriptionEl.className = "description";
    card.appendChild(descriptionEl);

    //Adding the information to the card 
    if(error === true) {
        //The function is being called from an error with the fetch

        cityEl.innerHTML = "-";
        iconEl.src = "img/icons/unknown.png";
        tempEl.innerHTML = `- ºC`;
        descriptionEl.innerHTML = "-";
    } else {
        //The function is being called on success of the fetch

        cityEl.innerHTML = city;
        iconEl.src = icon;
        tempEl.innerHTML = `${temperature} ºC`;
        descriptionEl.innerHTML = description;
    }
}


// ---------------------------------------- THE CODE WILL START RUNNING FROM HERE ----------------------------------------//


searchEl = document.querySelector("#searchBtn");
searchEl.addEventListener("click", filterCities);

showAllEl = document.querySelector("#showAllBtn");
showAllEl.addEventListener("click", () => {renderArray(cities)});

renderArray(cities); 

