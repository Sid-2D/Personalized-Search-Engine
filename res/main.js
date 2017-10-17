var display, searchRequest, searchTerm, personalizeRequest

window.onload = function() {
    display = document.getElementById('display')
    searchTerm = document.getElementById('searchTerm')
    searchRequest = new XMLHttpRequest()
    searchRequest.addEventListener('load', searchRequestSuccessful)
    searchRequest.addEventListener('error', searchRequestFailed)
}

function getSearchResults() {
	var query = searchTerm.value
	console.log('Sending request: ', query)
	searchRequest.open('GET', `/search/${query}`)
	searchRequest.send()
	display.innerHTML = '<h4 style="color:#ccc;animation: fadeIn 1s; text-align: center; margin: 10px; font-family: \'Open Sans\';">Fetching results...</h4>'
}

function makeCard(cardTitle, cardLink, cardSnippet) {
	var div = document.createElement('div')
	div.setAttribute('class', 'card')
	div.setAttribute('style', 'margin: 10px; animation: fadeIn 2s;')
	var cardBlock = document.createElement('div')
	cardBlock.setAttribute('class', 'card-block')
	var title = document.createElement('h4')
	title.innerText = cardTitle
	title.setAttribute('class', 'card-title')
	cardBlock.appendChild(title)
	var snippet = document.createElement('p')
	snippet.setAttribute('class', 'card-text')
	snippet.innerText = cardSnippet
	cardBlock.appendChild(snippet)
	var a = document.createElement('a')
	a.setAttribute('href', cardLink)
	a.setAttribute('class', 'card-link')
	a.setAttribute('target', '_blank')
	a.innerText = cardLink
	cardBlock.appendChild(a)
	div.appendChild(cardBlock)
	return div
}

function searchRequestSuccessful() {
	console.log('Success')
	var results = JSON.parse(searchRequest.response)
	var history = saveHistory()
	display.innerHTML = '<h4 style="color:#ccc;animation: fadeIn 4s; text-align: center; margin: 10px; font-family: \'Open Sans\';">Personalizing...</h4>'
	results.items.forEach(item => {
		var card = makeCard(item.title, item.link, item.snippet)
		display.appendChild(card)
	})
	sendPersonalisationRequest(results, history)
}

function searchRequestFailed() {
	console.log('Failed')
	display.innerHTML = '<h4 style="color:#ccc;animation: fadeIn 4s; text-align: center; margin: 10px; font-family: \'Open Sans\';">An error occured, try again.</h4>'
}

function sendPersonalisationRequest(results, history) {
	personalizeRequest = new XMLHttpRequest;
	personalizeRequest.addEventListener('load', personalizeRequestSuccess)
	personalizeRequest.addEventListener('error', personalizeRequestFailed)
	personalizeRequest.open('POST', '/personalize')
	personalizeRequest.setRequestHeader('Content-type', 'application/json')
	console.log({
		results,
		history
	})
	personalizeRequest.send(JSON.stringify({
		results,
		history
	}))
}

function personalizeRequestSuccess() {
	console.log('Success')
	var results = JSON.parse(personalizeRequest.response)
	console.log(results)
	display.innerHTML = '<h4 style="color:#ccc;animation: fadeIn 4s; text-align: center; margin: 10px; font-family: \'Open Sans\';">Personalization done.</h4>'
	results.results.items.forEach(item => {
		var card = makeCard(item.title, item.link, item.snippet)
		display.appendChild(card)
	})
}

function personalizeRequestFailed() {
	console.log('Failed')
	display.innerHTML = '<h4 style="color:#ccc;animation: fadeIn 4s; text-align: center; margin: 10px; font-family: \'Open Sans\';">An error occured, try again.</h4>'
}

function saveHistory() {
	var history = []
	if (localStorage['history']) {
		history = JSON.parse(localStorage['history'])
	} 
	history.push(searchTerm.value)
	localStorage['history'] = JSON.stringify(history)
	return history.join(' ')
}