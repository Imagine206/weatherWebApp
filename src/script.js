async function getLocation(cityName){
    
    try{
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`);

        if(response.ok){
            const data = await response.json();

            console.log(data.results[0])
            if(data.results.length > 0){
                const location = data.results[0];
                const name = location.name;
                const {latitude: latitude, longitude: longitude} = data.results[0];

                return {
                    name, 
                    latitude,
                    longitude
                }
            }else {
                console.error("No results found for the specified city")
                return null;
            }
        }else{
            throw new Error("Error fetching location data.")
        }
    }catch (error){
        console.log("Error fetching: ", error);
        return null;
    }
    
    

}

getLocation('Settle')
    .then(location => {
        if (location){
            getWeather(location.latitude, location.longitude)
        }
    })


async function getWeather(lat, lon){
    return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,rain,visibility,${"is_day"}&current_weather=true&models=best_match`)
                .then(res => {
                    if(res.ok){
                        return res.json();
                    }else {
                        throw new Error("Error res not Ok")
                    }
                })
                .then(data => {
                    getLocation()
                            .then(data => {
                                console.log(data)
                            })
                })
                .catch(error => {
                    console.log("Error fetching: ", error)
                })
}

getWeather();

// const apiKey = '44620723fec33f6cad2a598c4d6cc9f1';

// async function getWeather() {
//   try {
//     const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=-1.2833&longitude=36.8167&hourly=temperature_2m`);
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.error('Error fetching:', error);
//   }
// }

// getWeather();





