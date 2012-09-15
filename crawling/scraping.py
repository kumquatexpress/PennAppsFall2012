import requests, re, sys
from bs4 import BeautifulSoup

def main():
	r = requests.get("http://philadelphia.craigslist.org/sub/",config={'verbose': sys.stderr})
	soup = BeautifulSoup(r.text)
	items = soup.find_all('p','row')
	for item in items:
		print item.find('span','itemph')

if __name__ == '__main__':
	main()
	login()
