let weather= {
  apikey: "59a69d9dea07c5b987a56115eb752b68",
  fetchWeather:function(city){
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" 
      + city 
      + "&units=metric&appid=" 
      + this.apikey
      )
    .then((response) => {
      if(!response.ok){
        alert("No weather found.");
        throw new Error("No weather found.");
      }
      return response.json();
    })
    .then((data) => this.displayWeather(data));
  },
  displayWeather: function(data){
    const{ name }=data;
    const{ icon, description }=data.weather[0];
    const{ temp, humidity }=data.main;
    const{ temp_min, temp_max, pressure,feels_like }=data.main;
    const{ speed }=data.wind;
    document.querySelector(".city").innerText="Weather in " + name;
    document.querySelector(".icon").src="http://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText=description;
    document.querySelector(".temp").innerText=temp + "°C";
    document.querySelector(".humidity").innerText="Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText="Wind speed: "+speed+ "km/h";
    document.querySelector(".feels_like").innerText="Feels_like: " + feels_like + "°C";
    document.querySelector(".temp_min").innerText="Temp_min: "+temp_min + "°C";
    document.querySelector(".temp_max").innerText="Temp_max: "+temp_max + "°C";
    document.querySelector(".pressure").innerText="Pressure: "+pressure;
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage="url('https://source.unsplash.com/1600x900/?"+ name +"')";
   },
   search: function(){
    this.fetchWeather(document.querySelector(".search-bar").value);
   },
};

document.querySelector(".search button").addEventListener("click", function(){
   weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup",function(event){
  if(event.key=="Enter"){
    weather.search();
  }
});


