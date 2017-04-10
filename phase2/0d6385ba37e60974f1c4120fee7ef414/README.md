
1. Name of my Application 

	the Cheapest and Best vegetable Around you!

2. KeyWords 

	list of venders, price

3. Description of the datasets and function design

	USDA National Farmers Market Directory API
	https://search.ams.usda.gov/farmersmarkets/v1/svcdesc.html
		
		DataType : jsonp
		Data columns used : marketname, GoogleLink, Address, Schedule
		url : 
			"http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + zip
			"http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + id


	* Do you use the primary dataset ”online climate data” from data.gov? [Y]
	* Are all these datasets from data.gov or data.indy.gov? If not, where are they coming from (links)?

		USDA National Farmers Market Data are coming from "https://search.ams.usda.gov/farmersmarkets/v1/svcdesc.html"

4. Brief Description

	My Application shows all the information about local markets in West Lafayette/Lafayette with Googlemap API. 


	● Map View:

		Basic Map with specific location [Y]
		Markers for location of markets [Y]
		Labels for markets' names [Y]
		InfoWindow to show detail information of a market [Y]
		Any other cover on the map (for example, cloud cover to show the weather effect) [ ]

	● Data Visualization:

		Use Graph? What is the type? (bar chart, pie chart, radar chart ...)
		Any interaction available on the graph? List them (enable click on numbers, drag on lines, change time/variables ...)

	● Interaction Form:

		Any information output? list them. (text field, text area, label, plain HTML ...)
		Any operation option (filters)? List them. (search markets, search vegetables, filter based on price, sort based on convenience ...)
		Any information input? List them. (comments, markers, user preference ...)
		Interaction with Map? List them. (filter on price will affect map markers, sort on price will affect map markers, ...)
		Interaction with data visualization? List them. (filter, sort, set variables ...)

5. Build Case


6. Test Case 
	
	I tested my project on Chrome
