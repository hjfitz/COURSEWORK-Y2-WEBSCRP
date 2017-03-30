/* * * * * * * * */
/* W E A T H E R */
/* * * * * * * * */

//TODO:
// Add a way to get the location in other ways (move to different page/js file?)
// Add a way to get the weather with city name

class Weather {
  constructor() {
    this.owm = 'http://api.openweathermap.org/data/2.5/weather?lat='
    this.dsn = 'https://api.darksky.net/forecast/30b70d1026437f163d8e413b72d70d4c/'
    this.owmkey = '&appid=bbc67f01cffb0e40951dbab4a4e69a87'
    this.owmImgUrl = 'http://openweathermap.org/img/w/'
    this.card = document.getElementById('weather-card')
  }

  getWithGeolocation(source='owm', cardToAdd) {
    navigator.geolocation.getCurrentPosition(pos => {
      let coords = {
        lat: pos.coords.latitude.toFixed(4),
        lon: pos.coords.longitude.toFixed(4)
      }
      this.getByLatLong(source, cardToAdd, coords)
    })
  }

  getByLatLong(source='owm', cardToAdd, coords) {
    if (source === 'owm') {
      let queryUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + coords.lat + '&lon=' + coords.lon + '&appid=bbc67f01cffb0e40951dbab4a4e69a87'
      console.log(queryUrl)
      Util.getJSON(queryUrl, data => {
        console.log(data)
        if (data.cod !== 200) {
          console.error('owm down, url: ' + queryUrl)
          this.getByLatLong('dsn', cardToAdd, coords)
        } else {
          console.info('Using OWM for weather.')
          let weather = {
            'min'      : this.kelvinToCelsius(data.main.temp_min),
            'max'      : this.kelvinToCelsius(data.main.temp_max),
            'avg'      : this.kelvinToCelsius(data.main.temp),
            'pressure' : data.main.pressure,
            'humidity' : data.main.humidity,
            'sunrise'  : data.sys.sunrise, //parse me!
            'sunset'   : data.sys.sunset,
            'desc'     : data.weather[0].main,
            'wind'     : {
            'speed'    : data.wind.speed,
            'deg'      : data.wind.deg
            },
            'sealevel' : data.main.sea_level,
            'owmicon'  : data.weather[0].icon
          }
          // this.saveWeather(weather)
          console.log(weather)
          this.addToCardObject(cardToAdd,weather)
        }
      })
      } else if (source === 'dsn') {
        console.info('Falling back to darksky.net for weather.')
        dsn += pos.coords.latitude.toFixed(4) + ','
        dsn +=pos.coords.longitude.toFixed(4) +'?units=si'
        // darksky.net has a no access-control-header present
        // rather than force the user to install a chrome extension
        // we use jquery's $.ajax and json with padding as the datatype
        $.ajax({
          url: dsn,
          dataType: 'jsonp',
          success: (data) => {
          this.weather = {
            'min'      : data.daily.data[0].temperatureMin,
            'max'      : data.daily.data[0].temperatureMax,
            'avg'      : data.currently.temperature,
            'pressure' : data.currently.pressure,
            'humidity' : data.currently.humidity,
            'sunrise'  : data.daily.data[0].sunriseTime,
            'sunset'   : data.daily.data[0].sunsetTime,
            'desc'     : data.currently.summary
          }
          callback(weather)
          }
        })
    }

  }

       addToCard() {
        let tempUnit = '°C'
        const weatherArea  = document.getElementById('weather-content')
        const weatherText  = document.getElementById('weather-text')
        const weatherTitle = document.getElementById('weather-title')
        const weatherImg   = document.getElementById('weather-image')
        const weatherDesc  = this.weather.desc

        const curTemp = this.weather.avg + tempUnit
        const minTemp = this.weather.min + tempUnit
        const maxTemp = this.weather.max + tempUnit

        // const tempPara    = document.createElement('p')
        // const minTempPara = document.createElement('p')
        // const maxTempPara = document.createElement('p')
        // const descPara    = document.createElement('p')

        const tempPara    = document.getElementById('tmep-para')
        const minTempPara = document.getElementById('min-temp-para')
        const maxTempPara = document.getElementById('max-temp-para')
        const descPara    = document.getElementById('desc-para')

        // const coldSpan = document.createElement('span')
        // const warmSpan = document.createElement('span')

        const coldSpan = document.getElementById('cold')
        const warmSpan = document.getElementById('warm')


        console.log(weatherDesc)
        weatherImg.src = 'http://openweathermap.org/img/w/' + this.weather.owmicon + ".png"

        coldSpan.classList = 'coldWeather'
        warmSpan.classList = 'warmWeather'

        coldSpan.textContent = minTemp
        warmSpan.textContent = maxTemp

        weatherTitle.textContent = 'It\'s currently ' + curTemp
        minTempPara.textContent = 'Maximum temp is '
        maxTempPara.textContent = 'Minimum temp is '

        // minTempPara.appendChild(coldSpan)
        // maxTempPara.appendChild(warmSpan)
        descPara.textContent = 'It\'s ' + weatherDesc.toLowerCase() + ' outside.'
        // weatherArea.appendChild(tempPara)
        // weatherArea.appendChild(minTempPara)
        // weatherArea.appendChild(maxTempPara)
        // weatherArea.appendChild(descPara)
      }

      addToCardObject(contentArea, weather) {

        let tempUnit = '°C' //fix me in config
        const weatherArea = document.getElementById(contentArea + '-content')
        const weatherText  = document.getElementById(contentArea + '-text')
        const weatherTitle = document.getElementById(contentArea + '-title')
        const weatherImg   = document.getElementById(contentArea + '-image')
        const weatherDesc  = weather.desc

        const curTemp = weather.avg + tempUnit
        const minTemp = weather.min + tempUnit
        const maxTemp = weather.max + tempUnit

        const tempPara    = document.createElement('p')
        const minTempPara = document.createElement('p')
        const maxTempPara = document.createElement('p')
        const descPara    = document.createElement('p')


        const coldSpan = document.createElement('span')
        const warmSpan = document.createElement('span')

        weatherImg.src = 'http://openweathermap.org/img/w/' + weather.owmicon + ".png"

        coldSpan.classList = 'coldWeather'
        warmSpan.classList = 'warmWeather'

        coldSpan.textContent = minTemp
        warmSpan.textContent = maxTemp

        weatherTitle.textContent = 'It\'s currently ' + curTemp
        minTempPara.textContent = 'Maximum temp is '
        maxTempPara.textContent = 'Minimum temp is '

        minTempPara.appendChild(coldSpan)
        maxTempPara.appendChild(warmSpan)
        descPara.textContent = 'It\'s ' + weatherDesc.toLowerCase() + ' outside.'
        weatherArea.appendChild(tempPara)
        weatherArea.appendChild(minTempPara)
        weatherArea.appendChild(maxTempPara)
        weatherArea.appendChild(descPara)
      }

       putInStatus() {
        let tempUnit = '°C'

        const weatherButton   = document.getElementById('weathinfo')
        const weatherHigh     = document.getElementById('weather-high')
        const weatherLow      = document.getElementById('weather-low')
        const weatherDesc     = document.getElementById('weather-description')
        const weatherInfoDesc = this.weather.desc

        const curTemp   = this.weather.avg + tempUnit
        const minTemp   = this.weather.min + tempUnit
        const maxTemp   = this.weather.max + tempUnit
        let tempPara    = document.createElement('p')
        let minTempPara = document.createElement('p')
        let maxTempPara = document.createElement('p')
        let descPara    = document.createElement('p')

        let coldSpan = document.createElement('span')
        let warmSpan = document.createElement('span')

        coldSpan.classList = 'coldWeather'
        warmSpan.classList = 'warmWeather'

        coldSpan.textContent = minTemp
        warmSpan.textContent = maxTemp

        weatherButton.textContent = 'It\'s currently ' + curTemp
        minTempPara.textContent   = 'Maximum temp is '
        maxTempPara.textContent   = 'Minimum temp is '

        minTempPara.appendChild(coldSpan)
        maxTempPara.appendChild(warmSpan)
        descPara.textContent = 'It\'s ' + weatherInfoDesc.toLowerCase() + ' outside.'

        weatherHigh.appendChild(minTempPara)
        weatherLow.appendChild(maxTempPara)
        weatherDesc.appendChild(descPara)
    }

     kelvinToCelsius(tempK) {
        return (parseInt(tempK) - 273.15).toFixed(2)
    }

     kelvinToFareneit(tempK) {
        return (parseInt(tempK) * (9/5) - 459.67).toFixed(2)
    }
}
