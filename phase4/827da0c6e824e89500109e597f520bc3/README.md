# Find a Place in Chicago to Rent - 2017-04-11

-Keywords: rent, student, Chicago, University of Illinois, price, decision criteria.

-Description of the datasets

Datasets that will be used are listed. However, at this phase not all details of how they will be used are specified.
(More datasets will be added later. Existing datasets maybe modified later.)

-Affordable Rental Housing Developments (https://catalog.data.gov/dataset/affordable-rental-housing-developments-ef5c2) Dataset of affordable Rental Housing to help students choose houses near Department of Computer Science – University of Illinois, Chicago.

	Position used: [19] that is the data of lat  
	Position used: [20] is data of lng
	Position used: [11] is the name of a place
	Position used: [10] is the type of a place
	Position used: [12] is the address of a place 
	Position used: [14] is the phone of a place


-Libraries - Locations, Hours and Contact Information (https://data.cityofchicago.org/api/views/x8fc-8rcq/rows.json?accessType=DOWNLOAD)

	Position used: [18][1] that is the data of lat  
	Position used: [18][2] is data of lng
	Position used: [8] is the name of a library
	Position used: [12] is the address of a library
	Position used: [9]is the hours operation of a library
	Position used: [16] is the phone of a library


-Police Stations (https://data.cityofchicago.org/api/views/z8bn-74gv/rows.json?accessType=DOWNLOAD)

	Position used: [20] that is the data of lat  
	Position used: [21] is data of lng
	Position used: [9] is the name of a police station
	Position used: [10] is the address of a police station
	Position used: [15] is the phone of a police station
	Position used: [14] is the url of a police station


----Climate Data Online (http://catalog.data.gov/dataset/climate-data-online-cdo). ---(not yet)

-Brief description

This is a Website to help a new student at University of Illinois that have no knowledge about the communities and neighborhoods in the town, to find a safe and affordable place to rent near Department of Computer Science – University of Illinois, Chicago.

The App uses Google Map API combined with open datasets to display decision criteria for Highest safety and within budget. Those decision criteria will include but not limited to: parks and recreation, location of services, schools, alternative modes of transportation, street lighting, closeness to highway, crime rates and types of crime, closeness to police/fire stations and education, real estate prices, criminal/offender registry, etc. As well as the comparison function over these features for multiple places.


-Map View

The starting point of the Google map is (41.8708 ° N, 87.6505 ° W) where Department of Computer Science – University of Illinois is located.
The main rental places are marked on the map by means of house icons. The characteristics such as name, type, address and telephone number of the places to rent are shown in an infowindows by clicking on each icon.


-Content

README.txt:  This file.
index.html:  Web application start page.
criteria.html: Main page of web application where is the map and navigation menu.
safeAffordable.html: First decision criteria that combines afforfable prices with security. (not yet)
css:  A directory with Bootstrap css style files and others created by me. 
js:   A directory contains all the javascript files and others created by me.
images:   A directory contains all images used in the website.

-Build up information

At this point the project only uses HTML/CSS/Javascript. However, other dependencies might be used in the future. An updated readme file will then be submitted along with later submissions.

-Test

The complete version of this App is exptected to be tested on the following broswers: Chrome, Firefox and Safari.
