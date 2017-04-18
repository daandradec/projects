
## Name of my Application 

	Farmer Markets Around you!

## KeyWords 

	A list of farmer markets, Products, Location

## Description of the datasets and function design

	USDA National Farmers Market Directory API
	https://search.ams.usda.gov/farmersmarkets/v1/svcdesc.html
		
		DataType : jsonp
		Data columns used : marketname, GoogleLink, Address
		url : 
			"http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + zip
			"http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + id
		data amount : 4


	* Do you use the primary dataset ”online climate data” from data.gov? [N]
	* Are all these datasets from data.gov or data.indy.gov? If not, where are they coming from (links)?

		USDA National Farmers Market Data are coming from "https://search.ams.usda.gov/farmersmarkets/v1/svcdesc.html"

## Brief Description

	My Application shows all the information about local farmer markets in West Lafayette/Lafayette with Googlemap API. The information includes Address, Products that each local market has.


Map View

	1. Basic Map with specific location [Y] 
	2. Markers for location of markets [Y]
	3. Labels for markets' names [Y]
	4. InfoWindow to show detail information of a market [Y]

Data Visualization

	1. Use Graph? What is the type? [N]
	2. Any interaction available on the graph? [N]

Interaction Form

	1. information output: text field, Plain HTML with Css		
	2. Mouse hover on map markers shows the detail information.
		

## Build Case

	Dependencies : HTML / CSS / Javascript


## Test Case 
	
	I tested my project on Chrome
