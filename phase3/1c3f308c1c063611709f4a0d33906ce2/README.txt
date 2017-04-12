Project name: EatSmart

Keyword: climate; local farm market; vendor

This app is a Web App to help people find freshest and cheapest vegetable in West Lafayette/Lafayette.
The app combines Google Map API with open datasets to help people figure out when and where to buy best vegetables.
The features it will cover include open hour, distance and transportation time, rating from Yelp, season of each vegetable, etc.

Dataset: 
	https://search.ams.usda.gov/farmersmarkets/v1/svcdesc.html for local farm market
	http://www.lafayettefarmersmarket.com/lafayette-farmer-s-market--vendor-directory.html for vendor info
	http://wlfarmersmarket.com/404.html for vendor info
	https://www.ncdc.noaa.gov/cdo-web/ for climate
	https://catalog.data.gov/dataset/consumer-price-index-average-price-data for average price for a selected vegetable in a certain month of a year
	
Map view:
	The initialized Map is located at the user's current location as the transportation time is one of our factors.
	The farmer markets sell vegetables will be marked
	The current weather will also show on the web app
	If the user click one of the marks on the map, then the details of that farmer's market will be shown
	
Data Visualization:
	Rating for each factor of choosing vegetables will be shown on APP as rating bar

Interation Form:
	User Selection form -- user chooses which vegetables he want to buy and add them into a cart
	Result form -- should includes
							1> the freshness of each vegetable in your cart considering the climate for each vendor's location of each market
							2> open hour and transportation time
							3> rating from Yelp for this farmer's market
							4> if it's a good season for a certain food, like strawberry in winter or apple in spring
							5> price range for a certain food
Content:
	README.txt --This file.
	index.html --Web page for the App
	style.css --CSS style file with template from Bootstrap
	js --A directory contains all the javescript files
	image --A directory contains all images used in the website
	csv -- Some preprocessed data used by APP other than the online data
	
Test:
	The complete version of this App is expected to be tested on Chrome and Firefox

	