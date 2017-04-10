# Veggie Camp
*Author: Mengyao Wang* <br>
*Competition: Purdue Ironhack 2017*
## Key words

* Vegetable vendors & prices
* West Lafayette/Lafayette
* Cheap
* Fresh

## Brief Description
Welcome to Veggie Camp! This is a web application which can provide realtime recommendation on purchasing the best and cheapest Vegetables in West Lafayette/Lafayette area.

## Datasets and function design
* **[Climate Data Online](https://www.ncdc.noaa.gov/cdo-web)** -- free access to NCDC's archive of global historical weather data, and this project also plans to use CDO APIs to retrieve the current weather. <br>
* **[Agricultural Marketing Service](https://search.ams.usda.gov/farmersmarkets/v1/svcdesc.html)** --  it provides information about farmers market including: locations, directions, operating times, product offerings, accepted forms of payment, and etc.<br>

## Structures

#### Map View
Using **[Google Map API](https://developers.google.com/maps/documentation/javascript/tutorial)** to acquire geographical information.
* [Y] The map will appear in the center of West Lafayette/Lafayette area.
* [Y] Markers will be where markets are, with name tag on it.
* [Y] Labels contains basic info, open time, etc will be shown when mouse is on the markers.
* [Y] By clicking marker, a side bar will show detailed market information to users.
* [N] [describe] Any other cover on the map (for example, cloud cover to show the weather effect)

#### Data Visualization:
Planning to use **[D3.js](http://d3js.org)** to beautify data Visualization<br>
* [Y] Planning to use radar chart to show multiple parameter about one single vegetable vendor.
* [Y] Yes it will be more interaction on the graph, like zoom in/out, enabling/disabling parameters, etc.

#### Interaction Form:

Only yes or no answer here in phase one, will be more detailed later.
* [Y] [List] Any information output? list them. (text field, text area, label, plain HTML ...)
* [Y] [List] Any operation option (filters)? List them. (search markets, search vegetables, filter based on price, sort based on convenience ...)
* [N] [List] Any information input? List them. (comments, markers, user preference ...)
* [Y] [List] Interaction with Map? List them. (filter on price will affect map markers, sort on price will affect map markers, ...)
* [Y] [List] Interaction with data visualization? List them. (filter, sort, set variables ...)

## Development Progress Updates
#### 3.30 - v0.0.1
By the end of the phase 1, the major goal has been set and data hunting finished. This project has decided which resources it will need, as listed above. And the author has tried several APIs to be familiar with it. A more mature UI will be born during phase 2.

#### 4.5 - v0.0.2
Adjusting UI. And still researching on data processing...
