/* * * * * * * * */
/* W E A T H E R */
/* * * * * * * * */

class Weather {
  constructor() {
    this.owm = 'http://api.openweathermap.org/data/2.5/weather?lat='
    this.dsn = 'https://api.darksky.net/forecast/30b70d1026437f163d8e413b72d70d4c/'
    this.owmkey = '&appid=bbc67f01cffb0e40951dbab4a4e69a87'
    this.owmImgUrl = 'http://openweathermap.org/img/w/'
    this.card = document.getElementById('weather-card')
    this.weatherStats = {}
    this.owmLookup = {
      //owm gives icon names, so that we can use them. skycons are nicer, so a lookup table is made.
      '01': 'CLEAR_DAY',
      '02': 'PARTLY_CLOUDY_DAY',
      '03': 'CLOUDY',
      '04': 'CLOUDY',
      '09': 'RAIN',
      '10': 'SLEET',
      '11': 'SLEET',
      '13': 'SNOW',
      '50': 'FOG'
    }

  }

  getWeatherStats() {
    return this.weatherStats
  }

  //we've got lat and long from the map. ask for a source, a card and coordinates,
  //the weather is grabbed from an api (or backup) and put on to the page
  getByLatLong(source, cardToAdd, coords) {
    if (source === 'owm') {
      let queryUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + coords.lat + '&lon=' + coords.lon + '&appid=bbc67f01cffb0e40951dbab4a4e69a87'
      Util.getJSON(queryUrl, data => {
        if (data.cod !== 200) {
          console.error('owm down, url: ' + queryUrl)
          //there's an error, fall back to the other api
          this.getByLatLong('dsn', cardToAdd, coords)
        } else {
          console.info('Using OWM for weather.')
          let weather = {
            'min'      : this.kelvinToCelsius(data.main.temp_min),
            'max'      : this.kelvinToCelsius(data.main.temp_max),
            'avg'      : this.kelvinToCelsius(data.main.temp),
            'pressure' : data.main.pressure,
            'humidity' : data.main.humidity,
            'sunrise'  : data.sys.sunrise,
            'sunset'   : data.sys.sunset,
            'desc'     : data.weather[0].main,
            'windspeed': data.wind.speed,
            'isOwm'    : true,
            //remove and alphabetical chars so that we may use the lookup
            'skycon'   : this.owmLookup[(data.weather[0].icon).replace(/[a-zA-z]/gi, '')]
          }
          this.weatherStats = weather
          this.addToCardObject(cardToAdd,weather)
        }
      })
      } else if (source === 'dsn') {
        console.info('Falling back to darksky.net for weather.')
        let dsnUrl = this.dsn + coords.lat + ',' + coords.lon +'?units=si'
        // darksky.net has a no access-control-header present
        // rather than force the user to install a chrome extension
        // we use jquery's $.ajax and json with padding as the datatype
        $.ajax({
          url: dsnUrl,
          dataType: 'jsonp',
          success: (data) => {
          let weather = {
            'min'      : data.daily.data[0].temperatureMin,
            'max'      : data.daily.data[0].temperatureMax,
            'avg'      : data.currently.temperature,
            'pressure' : data.currently.pressure,
            'humidity' : data.currently.humidity,
            'sunrise'  : data.daily.data[0].sunriseTime,
            'sunset'   : data.daily.data[0].sunsetTime,
            'desc'     : data.currently.summary,
            'windspeed': data.currently.windSpeed,
            'isOwm'    : false,
            'skycon'   : data.currently.icon.toUpperCase().replace(/\-/g,'_')
          }
          console.log(dsnUrl)
          this.weatherStats = weather
          this.addToCardObject(cardToAdd,this.weather)
          }
        })
    }

  }


  addToCardObject(contentArea, weather) {
    //get the weather preferences and save to LS for access here
    getWeatherPreferences()
    let weatherPrefs = window.localStorage.getItem('weather_preferences')
    weatherPrefs = JSON.parse(weatherPrefs)
    let tempUnit = '°C'
    if (weatherPrefs.unit == 'F') { //we default to centigrade, so if fahrenheit is defined, we convert.
      tempUnit = '°F'
      weather.avg = this.celsiusToFahrenheit(weather.avg)
      weather.min = this.celsiusToFahrenheit(weather.min)
      weather.max = this.celsiusToFahrenheit(weather.max)
    }

    //remove all elements that have previously been added
    let deletable = document.querySelectorAll('.weather-delete')
    for (const del of deletable) {
      del.parentElement.removeChild(del)
    }

    // get the areas from the card - so that we can put information in them
    const weatherArea  = document.getElementById(contentArea + '-content')
    const weatherText  = document.getElementById(contentArea + '-text')
    const weatherTitle = document.getElementById(contentArea + '-title')
    const weatherImg   = document.getElementById(contentArea + '-image')
    const weatherDesc  = weather.desc

    //make the temperatures more informative
    const curTemp = weather.avg + tempUnit
    const minTemp = weather.min + tempUnit
    const maxTemp = weather.max + tempUnit

    //create areas for information
    const tempPara    = document.createElement('p')
    const minTempPara = document.createElement('p')
    const maxTempPara = document.createElement('p')
    const descPara    = document.createElement('p')
    //mark them as disposable.
    tempPara.classList = "weather-delete"
    minTempPara.classList = "weather-delete"
    maxTempPara.classList = "weather-delete"
    descPara.classList = "weather-delete"

    //define spans so that we may color the cold and warm temperatures.
    const coldSpan = document.createElement('span')
    const warmSpan = document.createElement('span')

    //add animated icon
    let imgContainer = document.getElementById('weather-image-link')
    //remove nodes in the image <a> tag.
    while (imgContainer.hasChildNodes()) {
      imgContainer.removeChild(imgContainer.lastChild)
    }
    //create a canvas to put skycons in
    //find the dimensions of the <a>, to size the canvas
    let
      canvas     = document.createElement('canvas'),
      dim        = imgContainer.parentElement.getBoundingClientRect(),
      canvHeight = dim.height,
      canvWidth  = dim.width;

    canvas.id = "weather-anim"
    canvas.height = canvHeight
    canvas.width = canvWidth
    imgContainer.appendChild(canvas)
    //create and play the weather icons
    let skycons = new Skycons({'color':'black'})
    let iconName = weather.skycon
    console.log(iconName)
    skycons.add(canvas,Skycons[iconName])
    skycons.play()


    coldSpan.classList = 'coldWeather'
    warmSpan.classList = 'warmWeather'

    coldSpan.textContent = minTemp
    warmSpan.textContent = maxTemp

    weatherTitle.textContent = `Its currently ${curTemp}`
    maxTempPara.textContent = 'Maximum temp is '
    minTempPara.textContent = 'Minimum temp is '

    //add the coloured spans
    minTempPara.appendChild(coldSpan)
    maxTempPara.appendChild(warmSpan)
    //add a description then add all the info to the card!
    descPara.textContent = `It's ${weatherDesc.toLowerCase()} outside.`
    weatherArea.appendChild(tempPara)
    weatherArea.appendChild(maxTempPara)
    weatherArea.appendChild(minTempPara)
    weatherArea.appendChild(descPara)

    //if we've selected any of the options, add that information.
    if (weatherPrefs.pressure == "true") {
      let pressurePara = document.createElement('p')
      pressurePara.textContent = "The pressure is: " + weather.pressure
      pressurePara.classList = "weather-delete"
      weatherArea.appendChild(pressurePara)
    }

    if (weatherPrefs.windspeed == "true") {
      let windPara = document.createElement('p')
      windPara.textContent = "The windspeed is: " + weather.windspeed
      windPara.classList = "weather-delete"
      weatherArea.appendChild(windPara)
    }

    if (weatherPrefs.humidity == "true") {
      let humidPara = document.createElement('p')
      humidPara.classList = "weather-delete"
      humidPara.textContent = `The humidity is ${weather.windspeed} outside`
      weatherArea.appendChild(humidPara)
    }

  }

  //helpful functions

  kelvinToCelsius(tempK) {
    return (parseFloat(tempK) - 273.15).toFixed(2)
  }

  celsiusToFahrenheit(tempF) {
    return (parseFloat(tempF) * (9/5) + 32).toFixed(2)
  }
}
