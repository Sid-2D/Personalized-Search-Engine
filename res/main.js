var display, request, searchTerm, apiKey = ''

window.onload = function() {
    display = document.getElementById('display')
    searchTerm = document.getElementById('searchTerm')
    request = new XMLHttpRequest()
    request.addEventListener('load', requestSuccessful)
    request.addEventListener('error', requestFailed)
}

function getSearchResults() {
	var query = searchTerm.value
	console.log('Sending request: ', query)
	request.open('GET', `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=010033202905348580265:ocd5j7uwpc8&q=${query}`)
	request.send()
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

function requestSuccessful() {
	console.log('Success')
	results = JSON.parse(request.response)
	saveHistory()
	display.innerText = ''
		results.items.forEach(item => {
		var card = makeCard(item.title, item.link, item.snippet)
		display.appendChild(card)
	})
}

function requestFailed() {
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
}