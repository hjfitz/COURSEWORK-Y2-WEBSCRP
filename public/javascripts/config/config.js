// get the elements required
const mainForm = document.getElementById('config-form')
const saveButton = document.getElementById('save-button')
const discardButton = document.getElementById('discard-button')

//temporary until onboarding is complete
function putConfigInPage () {
  //clear page before we add more selects!
  mainForm.innerHTML = ''
  // jQuery GET looks significantly nicer than using XMLHttpRequest
  $.get('http://api.webscrp.dev:8000/config', (data) => {
    // as of yet, there's no dynamic way to create this.
    // Perhaps the json should be restructured TODO(?)
    createSelect('weather', data.weather.provider, data.weather.providers)
    createSelect('image', data.image.provider, data.image.providers)
    createSelect('news', data.news.provider, data.news.providers)
    createSelect('reddit-pic', data.reddit.picSub, data.reddit.picSubs)
    createSelect('reddit-news', data.reddit.newsSub, data.reddit.newsSubs)
  })
}

// makes a PUT request to save the configuration
function saveConfig () {
  //get the config
  clientConfig = getConfigFromPage()
  //shove it on the server
  $.ajax({
    type: 'PUT',
    url: 'http://api.webscrp.dev:8000/config',
    data: clientConfig
  })
}

/**
 * @return JSON object, new configuration information to PUT to the server
 * goes through all select elements on page and gets their selected options
 * because materialize is *wonderful*, we need to go about this a different way.
 */
function getConfigFromPage () {
  let newConfig = {
    // It'd be nice to use less jQuery for getting the values
    // The only other way to do this was a series of .children[n].children[m].children........
    // But hey, it looks nice!
    'weather': $('#weather').val(),
    'image': $('#image').val(),
    'news': $('#news').val(),
    'reddit-pic': $('#reddit-pic').val(),
    'reddit-news': $('#reddit-news').val()
  }
  return newConfig
}

/**
 * @param title the id/label of the dropdown
 * @param initial the initial value (set in the config)
 * @param options array of options to add to the select
 * creates a list select container with a number of options
 */
function createSelect (title, initial, options) {
  // create main elements
  let container = document.createElement('div')
  let select = document.createElement('select')
  let selectTitle = document.createElement('option')
  let label = document.createElement('label')
  label.textContent = title
  container.classList = 'input-field col m8 offset-m2'
  // container.id = title
  select.id = title
  container.appendChild(select)
  container.appendChild(label)
  selectTitle.textContent = initial
  selectTitle.value = ''
  selectTitle.disabled = true
  selectTitle.selected = true
  select.appendChild(selectTitle)
  /*
   * ES6 iterating is much nicer!
   * Loop through our options and create an option element for the select
   * set the value and textContent of that option to the item in the array
   * stick them to the select container
   */
  for (const opt of options) {
    let option = document.createElement('option')
    option.value = opt
    option.textContent = opt
    select.appendChild(option)
  }
  // stick our brand new select in the page (and reinitialise)
  mainForm.appendChild(container)
  $('select').material_select()
}

$(document).ready( () => {
  // attach event listeners
  discardButton.addEventListener('click', putConfigInPage)
  saveButton.addEventListener('click', saveConfig)
  // stick the current configuration in the page
  putConfigInPage()
})
