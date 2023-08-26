const userInput = document.getElementById("userInput")


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

const apiKey = "wcis80F4Zjlb5bxN230ak5HArGqE5bWlVJRCTwcJxKM"
async function getImage(){
    try {
        const response = await fetch(`https://api.unsplash.com/photos/random/?client_id=${apiKey}&query=${userInput.value}`)
        const data = await response.json();

        if (response.ok){
            const imageUrl = data.urls.regular;
            return imageUrl;
        }else {
            console.log('API request failed: ', data.errors);
        }
    } catch (error) {
        console.error("Error fetching image: ", error)
    }
}



function Weather(e){
    e.preventDefault();
    
    if(userInput.value !== ""){
        getImage().then(imageUrl => {
            console.log(imageUrl)
            const imageElement = document.getElementById('bgImg');
            imageElement.style.backgroundImage = `url(${imageUrl})`
        })

        getWeather(userInput.value)
            .then(data => {
                displayWeather(data.location, data.current);
        })
    }else {
        alert("U must enter something")
    }
    

}

function displayWeather(location, current){
    const {name, region, country, localtime} = location;
    const {feelslike_f, temp_f, wind_mph, humidity, condition} = current;

    
    let time = document.getElementById('time');
    let place = document.getElementById('location');

    place.innerHTML = '';
    time.innerHTML = '';

    time.innerHTML = localtime;
    place.innerHTML = `${name}, ${country} `;
}


const submitBtn = document.getElementById('submit')
submitBtn.addEventListener('click', Weather)
