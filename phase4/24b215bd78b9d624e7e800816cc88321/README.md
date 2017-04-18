House-Me
======

Keywords
------

rental, safety, budget

Description of the datasets and function design
------

 *  | name                                              | link                                                                                                            | data type  |data columns used|data amount|
    | :-----------------------------------------------: |:---------------------------------------------------------------------------------------------------------------:|:----------:|:---------------:|:---------:|
    | Safe Passages                                     | <https://data.cityofchicago.org/Public-Safety/Safe-Passages/b4yy-ytgy>                                          | Json table | TBD             |TBD        |
    | Crimes - 2001 to present                          | <https://data.cityofchicago.org/Public-Safety/Crimes-2001-to-present/ijzp-q8t2>                                 | Json table | TBD             |TBD        |
    | Affordable Rental Housing Developments            | <https://data.cityofchicago.org/Community-Economic-Development/Affordable-Rental-Housing-Developments/s6ha-ppgi>| Json table | TBD             |TBD        |
 * [Y/N] Do you use the primary dataset ”online climate data” from data.gov? `yes`
 * [Y/N] [List] Are all these datasets from data.gov or data.indy.gov? `yes, but the Climate Data Online, which comes from https://www.ncdc.noaa.gov/cdo-web/`

Brief Description
------

 The main objective of the application is to mark places for rent in a map to students near the Department of Computer Science of the University of Illinois, Chicago. The ideal case is to show the ideal houses for them based on their budget and the safety of the zone.

 ### Fill in the structued description:
 #### Map View:
	1. [Y/N] Basic Map with specific location `Yes, the city of Chicago, IL`
	2. [Y/N] Markers for location of markets
	3. [Y/N] Labels for markets' names
	4. [Y/N] InfoWindow to show detail information of a market
	5. [Y/N] [describe] Any other cover on the map (for example, cloud cover to show the weather effect)

 #### Data Visualization:
	1. [Y/N] [describe] Use Graph? What is the type? (bar chart, pie chart, radar chart ...)
	2. [Y/N] [List] Any interaction available on the graph? List them (enable click on numbers, drag on lines, change time/variables ...)
	
 #### Interaction Form:
	1. [Y/N] [List] Any information output? list them. (text field, text area, label, plain HTML ...)
	2. [Y/N] [List] Any operation option (filters)? List them. (search markets, search vegetables, filter based on price, sort based on convenience ...)
	3. [Y/N] [List] Any information input? List them. (comments, markers, user preference ...)
	4. [Y/N] [List] Interaction with Map? List them. (filter on price will affect map markers, sort on price will affect map markers, ...)
	5. [Y/N] [List] Interaction with data visualization? List them. (filter, sort, set variables ...)

Build Case
------

Clone this repo, then navigate in console to the folder where this project has been cloned (e.g: `$cd \path\to\cloned\repo`) and run the following commands:
Update node and tell the system to use the latest version (replace x.y.z to the installed version, e.g: 7.8.0)
```
$nvm install node
$nvm use x.y.z
$nvm alias default vx.y.z
```
Install npm on the recently installed node
```
$npm install -g npm
```
Make sure that you are on the folder where package.json is located and install the dependencies.
```
$npm install -g
$npm install
```
Compile and run the project
```
$ng serve
```
Now you should be able to open the application on the browser, just typing the address <http://localhost:4200/>

Test Case
------

The application was tested in google chrome.

Additional information
------

n/a