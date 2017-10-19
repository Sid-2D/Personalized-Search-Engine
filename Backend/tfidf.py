from sklearn.feature_extraction.text import TfidfVectorizer
import json
import pprint

def filterResults(results):
	arr = []
	for item in results['results']['items']:
		# arr.append({
		# 	'title': item['title'],
		# 	'snippet': item['snippet']
		# })
		arr.append(item['snippet'])
	print arr

def findSimiliarity(results, history):
	filteredResults = filterResults(results)
	elements = [filteredResults, history]
	# tfidf = TfidfVectorizer().fit_transform(elements)
	# pairwise_similarity = tfidf * tfidf.T

if __name__ == '__main__':
	fp = open('../personalizeData.json')
	content = json.load(fp)
	fp.close()
	filterResults(content)