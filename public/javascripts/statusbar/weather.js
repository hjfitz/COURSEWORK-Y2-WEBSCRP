const OWMAPIKEY = 'bbc67f01cffb0e40951dbab4a4e69a87'
const OWMIMGURL = 'http://openweathermap.org/img/w/'

let owm = 'http://api.openweathermap.org/data/2.5/weather?lat='
let dsn = 'https://api.darksky.net/forecast/30b70d1026437f163d8e413b72d70d4c/'

class Weather {
  constructor() {
    this.owm = 'http://api.openweathermap.org/data/2.5/weather?lat='
    this.dsn = 'https://api.darksky.net/forecast/30b70d1026437f163d8e413b72d70d4c/'
    this.owmkey = 'bbc67f01cffb0e40951dbab4a4e69a87'
    this.owmImgUrl = 'http://openweathermap.org/img/w/'
    this.card = document.getElementById('weather-card')
    this.weather = { }
  }

  static getWithGeolocation(source='owm', callback) {
    navigator.geolocation.getCurrentPosition(pos => {
      let COORDS = {
        lat: pos.coords.latitude.toFixed(4),
        lon: pos.coords.longitude.toFixed(4)
      }
      this.getByLatLong(source, callback, COORDS)
    })
  }

  static getByLatLong(source='owm', callback, COORDS) {
    if (source === 'owm') {
      owm += COORDS.lat + '&lon=' + COORDS.lon + '&appid=' + OWMAPIKEY
      Util.getJSON(owm, data => {
        console.log(data)
        if (data.cod !== 200) {
          console.error('owm down, url: ' + owm)
          this.getWithGeolocation('dsn', callback)
        } else {
          console.info('Using OWM for weather.')
          this.weather =
          { 'min'      : kelvinToCelsius(data.main.temp_min),
            'max'      : kelvinToCelsius(data.main.temp_max),
            'avg'      : kelvinToCelsius(data.main.temp),
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
          callback(weatherInfo)
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
          let weatherInfo = {
            'min'      : data.daily.data[0].temperatureMin,
            'max'      : data.daily.data[0].temperatureMax,
            'avg'      : data.currently.temperature,
            'pressure' : data.currently.pressure,
            'humidity' : data.currently.humidity,
            'sunrise'  : data.daily.data[0].sunriseTime,
            'sunset'   : data.daily.data[0].sunsetTime,
            'desc'     : data.currently.summary
          }
          callback(weatherInfo)
        }
      })
    }

  }

  static addToCard() {
    let tempUnit = '°C'
    const weatherArea  = document.getElementById('weather-content')
    const weatherText  = document.getElementById('weather-text')
    const weatherTitle = document.getElementById('weather-title')
    const weatherImg   = document.getElementById('weather-image')
    const weatherDesc  = weatherInfo.desc

    const curTemp = weatherInfo.avg + tempUnit
    const minTemp = weatherInfo.min + tempUnit
    const maxTemp = weatherInfo.max + tempUnit

    const tempPara    = document.createElement('p')
    const minTempPara = document.createElement('p')
    const maxTempPara = document.createElement('p')
    const descPara    = document.createElement('p')

    const coldSpan = document.createElement('span')
    const warmSpan = document.createElement('span')

    console.log(weatherDesc)
    weatherImg.src = OWMIMGURL + weatherInfo.owmicon + ".png"

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

  static putInStatus() {
    let tempUnit = '°C'

    const weatherButton   = document.getElementById('weathinfo')
    const weatherHigh     = document.getElementById('weather-high')
    const weatherLow      = document.getElementById('weather-low')
    const weatherDesc     = document.getElementById('weather-description')
    const weatherInfoDesc = weatherInfo.desc

    const curTemp   = weatherInfo.avg + tempUnit
    const minTemp   = weatherInfo.min + tempUnit
    const maxTemp   = weatherInfo.max + tempUnit
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

  static kelvinToCelsius(tempK) {
    return (parseInt(tempK) - 273.15).toFixed(2)
  }

  static kelvinToFareneit(tempK) {
    return (parseInt(tempK) * (9/5) - 459.67).toFixed(2)
  }

}


function getWeatherWithGeoLocation(source='owm', callback) {
  navigator.geolocation.getCurrentPosition(pos => {
    let COORDS = {
      lat: pos.coords.latitude.toFixed(4),
      lon: pos.coords.longitude.toFixed(4)
    }
    getWeatherByCoords(source, callback, COORDS)
  })
}

function getWeatherByCoords(source='owm', callback, COORDS) {
  if (source === 'owm') {
    owm += COORDS.lat + '&lon=' + COORDS.lon + '&appid=' + OWMAPIKEY
    Util.getJSON(owm, (data) => {
      console.log(data)
      if (data.cod !== 200) {
        console.error('owm down, url: ' + owm)
        getWeather('dsn', callback)
      } else {
        console.info('Using OWM for weather.')
        let weatherInfo =
        { 'min'      : kelvinToCelsius(data.main.temp_min),
          'max'      : kelvinToCelsius(data.main.temp_max),
          'avg'      : kelvinToCelsius(data.main.temp),
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
        callback(weatherInfo)
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
        let weatherInfo = {
          'min'      : data.daily.data[0].temperatureMin,
          'max'      : data.daily.data[0].temperatureMax,
          'avg'      : data.currently.temperature,
          'pressure' : data.currently.pressure,
          'humidity' : data.currently.humidity,
          'sunrise'  : data.daily.data[0].sunriseTime,
          'sunset'   : data.daily.data[0].sunsetTime,
          'desc'     : data.currently.summary
        }
        callback(weatherInfo)
      }
    })
  }
}

function putWeatherInCard(weatherInfo) {
  let tempUnit = '°C'
  const weatherArea  = document.getElementById('weather-content')
  const weatherText  = document.getElementById('weather-text')
  const weatherTitle = document.getElementById('weather-title')
  const weatherImg   = document.getElementById('weather-image')
  const weatherDesc  = weatherInfo.desc

  const curTemp = weatherInfo.avg + tempUnit
  const minTemp = weatherInfo.min + tempUnit
  const maxTemp = weatherInfo.max + tempUnit

  const tempPara    = document.createElement('p')
  const minTempPara = document.createElement('p')
  const maxTempPara = document.createElement('p')
  const descPara    = document.createElement('p')

  const coldSpan = document.createElement('span')
  const warmSpan = document.createElement('span')

  console.log(weatherDesc)
  weatherImg.src = OWMIMGURL + weatherInfo.owmicon + ".png"

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

function putWeatherInStatus (weatherInfo) {
  let tempUnit = '°C'

  const weatherButton   = document.getElementById('weathinfo')
  const weatherHigh     = document.getElementById('weather-high')
  const weatherLow      = document.getElementById('weather-low')
  const weatherDesc     = document.getElementById('weather-description')
  const weatherInfoDesc = weatherInfo.desc

  const curTemp   = weatherInfo.avg + tempUnit
  const minTemp   = weatherInfo.min + tempUnit
  const maxTemp   = weatherInfo.max + tempUnit
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
