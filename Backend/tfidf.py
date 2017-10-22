from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np
import json
import pprint
import re

def filterResults(results):
	arr = []
	for item in results['results']['items']:
		# filter out dates from snippet here
		snippet = item['snippet']
		match = re.search(r'\.\.\..+', snippet)
		if match:
			print 'Date found:\n', match.group()
			arr.append(match.group()[4:])
		else:
			arr.append(snippet)
	return arr

def findSimiliarity(results):
	results = json.loads(results)
	filteredResults = filterResults(results)
	filteredResults.insert(0, results['history'])
	tfidf = TfidfVectorizer().fit_transform(filteredResults)
	pairwise_similarity = tfidf * tfidf.T
	i = 0
	for item in filteredResults:
		print '\n', i, item
		i += 1
	weights = pairwise_similarity[:, 0]
	# Add weights to results
	weightedList = []
	del filteredResults[0]
	for i in range(len(filteredResults)):
		weightedList.append({
			'snippet': filteredResults[i],
			'weight': weights[i + 1, 0],
			'title': results['results']['items'][i]['title'],
			'link': results['results']['items'][i]['link']
		})
	# Sort the array w.r.t weights
	weightedList.sort(key = lambda x: x['weight'], reverse = True)
	return json.dumps(weightedList, indent = 2)

if __name__ == '__main__':
	fp = open('../personalizeData.json')
	content = json.load(fp)
	fp.close()
	findSimiliarity(content)
	print results['results']['items']