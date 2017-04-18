

APPLICATION NAME: find the place

KEYWORDS: distance,map,crime,housing,almostclimate

DATASETS (saw the tutorial and now i've learned a bit):


Housing dataset: the easy one, just like as the tutorial :D.

Columns:       
                
                //latitude - 0          DataAmount:263 records

                //longitude - 1
                
                //name - 2
                
                //type -3
                
                //street - 4
                
                //ZIP-5
                
                //phone - 6
                
https://data.cityofchicago.org/Community-Economic-Development/Affordable-Rental-Housing-Developments/s6ha-ppgi

Climate data online(the mandatory one?):
i've been looking for some way to display some like "today looks sunny" but didn't figure out how. also this dataset is really more 
complicated than the others, also wanted to use the zillow api but looks as complicated as this one.
https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=NEXRAD2&startdate=2017-03-01&enddate=2017-03-31&limit=15


Crimes dataset: 
https://data.cityofchicago.org/Public-Safety/Crimes-One-year-prior-to-present/x2n5-8w5q
Columns:latitude,longitude,type of crime(not implemented yet). near 265K records

[Y/N] Do you use the primary dataset ”online climate data” from data.gov?

NOT YET

[Y/N] [List] Are all these datasets from data.gov or data.indy.gov? If not, where are they coming from (links)?

the majority of datasets i will use is from data.cityof.chicago.gov because it's easier. i will try try to implement the noaa,gov API, or maybe the Zillow for a best housing info.

BRIEF DESCRIPTION:

Well i've been learning things and i hope to represent all the datasets trough the googlemaps API, implemented a simple housing and crime datasets for now. Also i found a beautiful function for distance aproximation.



Map View:

    [Y/N] Basic Map with specific location (your map is located in a meaningful place, city of west lafayette for example) Yes
    [Y/N] Markers for location of markets Yes.
    [Y/N] Labels for markets' names       Yes.
    [Y/N] InfoWindow to show detail information of a market   Yes.
    [Y/N] [describe] Any other cover on the map (for example, cloud cover to show the weather effect) that's possible? still looking fot this.
Data Visualization:
    a circle of crime rate and a little nice bar with color scale.
    
Interaction Form:
      just the map for now. and now a table and now a filterbar PD:you can now click the table rows.
      
 5TH SECTION: i just used jnode.js for testings things

Test Case Which browsers did you test your project on? Chrome, IE, Edge, Safari, or Firefox?

Firefox and Chrome and opera. now i recomend Chrome and opera because it's good at loading the HUGE crimes dataset.

*Additional information You Want to Share with Us E.g. any problems you faced/fixed, where you reached out to for help, etc.

Climate dataset still weird my friend, please give me a hint.


