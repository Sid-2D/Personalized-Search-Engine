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
		# filter out dates from snippet here
		arr.append(item['snippet'])
	return arr

def findSimiliarity(results):
	filteredResults = filterResults(results)
	filteredResults.insert(0, results['history'])
	tfidf = TfidfVectorizer().fit_transform(filteredResults)
	print len(filteredResults)
	print '\n', tfidf
	pairwise_similarity = tfidf * tfidf.T
	print '\n', pairwise_similarity
	i = 0
	for item in filteredResults:
		print '\n', i, item
		i += 1
	print '\n', pairwise_similarity[:, 0]

if __name__ == '__main__':
	fp = open('../personalizeData.json')
	content = json.load(fp)
	fp.close()
	findSimiliarity(content)