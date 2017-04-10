

APPLICATION NAME: find the place

KEYWORDS: distance,map,title,housing,almostclimate

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


Crimes dataset: im plannig to implement this dataset, but still complicated for draw blocks in the googlemaps api, i will seek for some way to do it.
https://data.cityofchicago.org/Public-Safety/Crimes-Map/dfnk-7re6

[Y/N] Do you use the primary dataset ”online climate data” from data.gov?

is not the noaa.gov dataset? or this one is also mandatory? :/

[Y/N] [List] Are all these datasets from data.gov or data.indy.gov? If not, where are they coming from (links)?

the majority of datasets i will use is from data.cityof.chicago.gov because it's easier. i will try try to implement the noaa,gov API, or maybe the Zillow for a best housing info.

BRIEF DESCRIPTION:

Well i've been learning things and i hope to represent all the datasets trough the googlemaps API, implemented a simple housing dataset for now. Also i found a beautiful function for distance aproximation.



Map View:

    [Y/N] Basic Map with specific location (your map is located in a meaningful place, city of west lafayette for example) Yes
    [Y/N] Markers for location of markets Yes.
    [Y/N] Labels for markets' names       Yes.
    [Y/N] InfoWindow to show detail information of a market   Yes.
    [Y/N] [describe] Any other cover on the map (for example, cloud cover to show the weather effect) that's possible? i will try.
Data Visualization:
    No graphs for now, comin soon.
    
Interaction Form:
      just the map for now... sorry ;/
      
 5TH SECTION: i just used jnode.js for testings things

Test Case Which browsers did you test your project on? Chrome, IE, Edge, Safari, or Firefox?

Firefox and Chrome.

Additional information You Want to Share with Us E.g. any problems you faced/fixed, where you reached out to for help, etc.

i've been wasting much time in how to use some datasets, aPI's like noaa and zillow still complicated for me, also i have not explore the googlemaps APi for Mapping data, it seems complicated for me as well.  i hope to add some D3 for the next. also i apologize for first commit (and maybe this one too).



