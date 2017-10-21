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
	weights = pairwise_similarity[:, 0]
	print '\n', weights
	# Add weights to results
	weightedList = []
	for i in range(len(filteredResults)):
		weightedList.append({
			'result': filteredResults[i],
			'weight': weights[i]
		})
	# Sort the array w.r.t weights
	# print sorted(weightedList, key=weights)
	weightedList.sort()
	print weightedList

if __name__ == '__main__':
	fp = open('../personalizeData.json')
	content = json.load(fp)
	fp.close()
	findSimiliarity(content)