const userInput = document.getElementById("userInput")


async function getWeather(cityName){

    try{
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=8cced427c682481685b222916231703&q=${cityName} &aqi=no`);

        if(response.ok){
            const data = response.json();
            return data;
        }else {
            alert("Location not found!")
            throw new Error("Location Not Found");
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
    

    userInput.value = ""

}

function displayWeather(location, current){
    console.log(location)
    console.log(current)
    const {name, region, country, localtime} = location;
    const {temp_f, wind_mph, humidity, condition, uv, wind_dir, vis_miles, feelslike_f, precip_mm} = current;

    
    let time = document.getElementById('time');
    let place = document.getElementById('location');
    let uvIndex = document.getElementById('uv');
    let windSpeed = document.getElementById('windSpeed');
    let temp = document.getElementById('temp');
    let cond = document.getElementById('cond');
    let windDr = document.getElementById('windDr');
    let hum = document.getElementById('hum');
    let iconImg = document.getElementById('iconImg');
    let vis = document.getElementById('vis');
    let feelsLike = document.getElementById('feelsLike');
    let precip = document.getElementById('precip');

console.log(condition.text)

    place.innerHTML = '';
    time.innerHTML = '';

    time.innerHTML = localtime;
    place.innerHTML = `${name}, ${country} `;
    uvIndex.innerHTML = uv;
    windSpeed.innerHTML = `${wind_mph} <small class="text-slate-400 text-[16px]">Mph</small>`;
    temp.innerHTML = `${temp_f}<i class="text-[7px] fa-regular fa-circle"></i> <small class="text-[16px] align-top"> f</small>`;
    cond.innerHTML = condition.text;
    windDr.innerHTML = wind_dir;
    iconImg.src = condition.icon;
    vis.innerHTML = `${vis_miles} <small class="text-slate-400 text-[16px]">M</small>`;
    hum.innerHTML = `${humidity}%`;
    if(humidity > 60){
        const humStatus = document.getElementById('humStatus');
        humStatus.innerHTML = `<i class="text-[16px] text-indigo-500 fa-solid fa-thumbs-down"></i> <small class="text-[16px] text-slate-400"> Extreme</small> `
    }else {
        humStatus.innerHTML = `<i class="text-[16px] text-indigo-500 fa-solid fa-thumbs-up"></i> <small class="text-[16px] text-slate-400"> Normal</small> `
    }

    feelsLike.innerHTML = feelslike_f;
    precip.innerHTML = precip_mm;
}


const submitBtn = document.getElementById('submit')
submitBtn.addEventListener('click', Weather)
