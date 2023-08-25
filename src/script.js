


async function getWeather(cityName){

    try{
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=8cced427c682481685b222916231703&q=${cityName} &aqi=no`);

        if(response.ok){
            const data = response.json();
            return data;
        }else {
            throw new Error("Location Not Found")
        }
    }catch (error){
            console.log("Error fetching: ", error);
            return null;
    }
    

}

function displayWeather(e){
    e.preventDefault();
    
    const userInput = document.getElementById("userInput")

    if(userInput.value !== ""){
        getWeather(userInput.value)
            .then(data => {
                console.log(data)
                const {name, region, country, localtime} = data.location;
                const {feelslike_f, temp_f, wind_mph, humidity, condition} = data.current;

                console.log(name, region)
                return {name, region, country, localtime};
        })
    }else {
        alert("U must enter something")
    }
    

}



const submitBtn = document.getElementById('submit')
submitBtn.addEventListener('click', displayWeather)