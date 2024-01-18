$("#citySelected").on("change", function(){

  const options = Array.from(this.options)
  const optionToSelect = options.find(item => item.value === this.value);
  const paramsCity = $.parseJSON(optionToSelect.value)
  const cityName = optionToSelect.text
      
  $("#results .weather-info").html("")
    
  getWeatherByCity(paramsCity)
 
})



function getWeatherByCity(params){
  $.ajax({
    url: "http://www.7timer.info/bin/api.pl/",
    data: {
        lon: params["lon"],
        lat: params["lat"],
        product: "civillight",
        output: "json"
    },
    referrerPolicy: "unsafe_url",
    beforeSend: function() {
      $(".overlay").show();
    },
    complete: function() {
      $(".overlay").hide();
    },
    success: function( result ) {
       
       const data = $.parseJSON(result)["dataseries"]
      
       for (let i = 0; i < data.length; i++ ) {
        
        let dateWeather = data[i]["date"].toString()
        let weather = data[i]["weather"]
        let tempMin = Math.round(data[i]["temp2m"]["min"])
        let tempMax = data[i]["temp2m"]["max"]
        //let wind = data[i]["wind10m_max"]

        let d = new Date(dateWeather.substring(0, 4),dateWeather.substring(4, 6)-1,dateWeather.substring(6, 8));
        dateWeather = d.toString().substring(0, 10)
        let desc = weather
        switch (weather) {
          case "pcloudy":
            desc = "Partly Cloudy"
            break;
          case "mcloudy":
            desc = "Mostly Cloudy"
            break;
          case "lightrain":
            desc = "Light Rain"
            break;
          case "lightsnow":
            desc = "Light Snow"
            break;
        
          default:
            break;
        }
       
        $("#results .weather-info").append(" <div id='weather_"+i+"' class='card'> <div class='card-body'>"
            + "<h5 class='weather-date'>" + dateWeather +"</h5>" +
            "<div class='weather-icon'> <img src='./images/"+ weather +".png'> </div>"
            
            +"<div class='description'>"+ desc +"</div>"
            +"<div class='temperature'> H: "+ tempMax +"°C <br> L: " +tempMin +"°C </div></div></div>")
       
      }
    }
  });
}
