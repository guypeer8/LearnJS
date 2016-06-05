#### List of scrapers:

* The Marker- Categories (main, news, business, tech, real estate, markets, finance, cars) --> Has a python flask server set to visualize the data. on 'themarker-flask' directory run 'app.py' and check localhost:5000

* Youtube- Trending videos

* Hackernews- All posts

* Walla! News- News articles

* Open Knesset- Law Propistions and Law initiators

* Open Knesset- Law propistions votes

* Billboard- Trending songs by category (hot-100, billboard-200, rock, mainstream rock, artist-100)

* Tiuli- Most recommended trips in Israel --> Has a python flask server and also node server set to visualize data

##### To Run it:

* git clone https://github.com/guypeer8/Web-Crawlers
* npm install request cheerio --save
* cd 'SCRAPER DIRECTORY'
* node index.js

*** In some of the scrapers, you need to pass category, or you are provided some functions you can run.
   You can also run the script with parameters you can provide via the command line. Each index.js file 
   in a folder has an explanation about how to use it properly.
   Also, check out the 'collectors' or 'crawlers' files to see the functions that are exported.
