Project ChicagoRent

Author: bsgarciac / Brayan Steven Garcia Cardenas

email: bsgarciac@unal.edu.co / garciacardenasbrayansteven1@gmail.com

----------- ChicagoRent --------------

Interactive - Innovation - Funny

--------------------------------------

3) Description of the datasets and function design

	-Affordable Rental Housing Developments:
		[link] https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD
		[info] The data of the houses (Location, name, address, number, etc) was extracted from this dataset. (The prices weren't extracted from here)
	-Libraries - Locations, Hours and Contact Informationo:
		[link] https://data.cityofchicago.org/api/views/x8fc-8rcq/rows.json?accessType=DOWNLOAD
		[info] The data of the libraries (Location, name, address, number, etc) was extracted from this dataset.
	-Police Stations
		[link] https://data.cityofchicago.org/api/views/z8bn-74gv/rows.json?accessType=DOWNLOAD
		[info] The data of the police stations (Location, name, address, number, etc) was extracted from this dataset.
	-Parks - Locations
		[link] https://data.cityofchicago.org/api/views/wwy2-k7b3/rows.json?accessType=DOWNLOAD
		[info] The data of the police stations (Location, name, address, number, etc) was extracted from this dataset.
	-Condom Distribution Sites
		[link] https://data.cityofchicago.org/api/views/azpf-uc4s/rows.json?accessType=DOWNLOAD
		[info] The data of the police stations (Location, name, address, number, etc) was extracted from this dataset.
	-Nearby Cook County Grocery Store Chains
		[link] https://data.cityofchicago.org/api/views/wryv-d7zf/rows.json?accessType=DOWNLOAD
		[info] The data of the police stations (Location, name, address, number, etc) was extracted from this dataset.
	-Crimes - One year prior to present
		[link] https://data.cityofchicago.org/api/views/x2n5-8w5q/rows.json?accessType=DOWNLOAD
		[info] This dataset was used to determined the safest zones in chicago, and to show the localization of crimes in the map.
		
	
	[Y/N] Do you use the primary dataset ”online climate data” from data.gov? 
		Yes: I calculate the average precipitation of the month with that dataset.
	[Y/N] [List] Are all these datasets from data.gov or data.indy.gov? If not, where are they coming from (links)?
		Yes: All from data.gov

4) Brief Description

ChicagoRent is a web page that helps new students of UIC to find a place to rent. It works with a map where the user can visualizate the position of the houses. Also the web page has an assistant named Brayan, he is going to help with the use of the web page.
- The user can filter the houses by distance from the university and community area.
- The user is going to see graphically the safest and the cheapest places to rent in Chicago.
- The user can see puntuation and stats for each place. 


-- Map View:

[Y/N] Basic Map with specific location (your map is located in a meaningful place, city of west lafayette for example)
	- Yes, It is.
[Y/N] Markers for location of markets
	- Yes, I use icons for each place(House, University, Park, etc).
[Y/N] Labels for markets' names
	- Yes, I use labels to identify the places(House, University, Park, (etc).
[Y/N] InfoWindow to show detail information of a market
	- Yes, besides I use 'google street view' to show an image of the place of the marker.
[Y/N] [describe] Any other cover on the map (for example, cloud cover to show the weather effect)
	- At the moment the map has a color system for prices and safety. (the green is the safest and the cheapest, etc)
	- The weather and the precipitation is shown in the dialogue of 'Brayan' (The assistant in the web page)
	- The assistant (Brayan) makes comments about each option. The comments are useful.
		
-- Data Visualization:

 [Y/N] [describe] Use Graph? What is the type? (bar chart, pie chart, radar chart ...)
 	- Yes, I use a simple bar chart comparing the safest community area, the dangerous community area, the average of all community areas and the community area of the house which the user is interesed.
 [Y/N] [List] Any interaction available on the graph? List them (enable click on numbers, drag on lines, change time/variables ...)
    - No, At the moment not really.

-- Interaction Form:

[Y/N] [List] Any information output? list them. (text field, text area, label, plain HTML ...)
	- Yes, A lot, almost all the information output is in infowindows, the windows of "Show more" and "Show stats" and the dialogue of 'Brayan'

[Y/N] [List] Any operation option (filters)? List them. (search markets, search vegetables, filter based on price, sort based on convenience ...)
	- Yes: Price, security, community area and distance from the university.
[Y/N] [List] Any information input? List them. (comments, markers, user preference ...)
	- Yes: The user preference of distance, and the user preference of community area.
[Y/N] [List] Interaction with Map? List them. (filter on price will affect map markers, sort on price will affect map markers, ...)
	- Yes: Price afects the color of the markers.
	- Yes: Security afects the color of the markers.
	- Yes: Final Puntuation afects the size of the marker.
[Y/N] [List] Interaction with data visualization? List them. (filter, sort, set variables ...)
	-Yes: Hide/Show the places near the university.
	-Yes: Hide/show the places within a radius and a community area.
	
5) Build Case How can we build and access your project on a Linux/Unix machine if you use external dependencies besides HTML/CSS/Javascript? List the dependencies you used, such as python, node.js, etc. List the steps we should follow to build the project.
	-----

6) Test Case Which browsers did you test your project on? Chrome, IE, Edge, Safari, or Firefox?
	-Chrome and firefox. I have a graphic problem in firefox.
	
7) Additional information You Want to Share with Us E.g. any problems you faced/fixed, where you reached out to for help, etc.
	-I still want to improve the app.