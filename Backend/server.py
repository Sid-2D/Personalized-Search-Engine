from flask import Flask, jsonify, send_from_directory
import requests

app = Flask(__name__)

@app.route('/')
def index():
	return  send_from_directory('../','index.html')

@app.route('/res/main.css')
def css():
	return send_from_directory('../res/', 'main.css')

@app.route('/res/main.js')
def js():
	return send_from_directory('../res/', 'main.js')

@app.route('/search/<query>')
def search(query):
	r = requests.get('https://www.googleapis.com/customsearch/v1?key=%s&cx=010033202905348580265:ocd5j7uwpc8&q=%s' % (apiKey, query))
	#TODO: Add success and error codes
	return r.content

@app.route('/personalize', methods = ['POST'])
def personalize():
	return 'TODO'

if __name__ == '__main__':
	app.run(debug=True)