const key = "dbd7b0db1f754da892e45e98bca2f4f5";


const getLat = city => {
    const url = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${key}&lang=es`;

    fetch(url)
    .then(response => response.json())
    .then(data => console.log(data.data[0].lon, data.data[0].lat, data.data[0].country_code));
}