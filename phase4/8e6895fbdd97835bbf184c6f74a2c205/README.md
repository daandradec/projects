Author: FFFeelipe
keywords:
GitHub, Chicago, google maps, processing data, Datasets, Zillow.

How to use:
The app offers you the posibility to find an affordable place to rent, using as parameteres:
* Closeness from the Illinois University in chicago
* Max budget
// the previous two, are the main criteria choosing, the results will allways Meets the conditions if activated
Additionally there are another 4 criteria choosing:
Closeness from the house to:
* Any park
* Any Police station
* Any Divvy Bicycle Stations
* Any Condom Distribution Site
// the previous two, are just for sorting, the firts results will be the ones that meet all the conditions.

If you want to add a max price(not exactly necesarilly since the mushapp just show "affordable" rentals), check the price per month switch and fill the appearing box with the price; same with the distance you'd like to be from college.

all criteria choosing, have it's own swith, if you leave the switch off, that criteria is not going to be relevant to the search.

after you fill the information you need, click the bottom "Go!", then, the app will choose the house and show each one on the map in the right; each marker will show you the address of that house.

then, click the "see results" bottom, it will add all the information about each house, and when you click on it, the map will be centered at that house, and show the secondary choosing criteria as markers with its own icon.

you can also see the pie chart with helpfull information about the last 2000 crimes in Chicago: the first one will show the Proportional number crimes committed near from all the available houses on the results;

in order to see the second chart, you need clik the space where the chart is located (not the chart itself), and it will show the Proportional number crimes, but only the ones that where committed close from the available houses; click again to see the previous chart.

The app will check the weather, and tell you an usefull advise.

The estimated rent, is provided by Zillow.

notes:

** In order to use the app, you must allow the CORS config in the server, or install and use the CORS extencion in Chrome.** 

The used datasets are:
zillow.com/ 
Zillow have the stimated rent

https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&sortfield=date&sortorder=desc&units=metric&locationid=ZIP:28801&startdate=
Weather info

https://data.cityofchicago.org/resource/6zsd-86xi.json
Information about crimes committed in Chicago

https://data.cityofchicago.org/resource/uahe-iimk.json
This dataSet, have the information about affordable places to live

https://data.cityofchicago.org/api/views/z8bn-74gv/rows.json
Information about police station in Chicago

https://data.cityofchicago.org/api/views/eix4-gf83/rows.json
Information about Parks in Chicago

https://data.cityofchicago.org/api/views/azpf-uc4s/rows.json
Information about Condom Distribution Site in Chicago


https://data.cityofchicago.org/api/views/bbyy-e7gq/rows.json
Information about Divvy Bicycle Stations in Chicago
