Juan Sebastian Vivero Jáuregui

1. Student well rent
2. Security, Distance, Fun.
3. The Datasets used are:
    - Affordable Rental Housing Developments.
        [link]: "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD"
        [data type]: Json
        [data columns used]: community_area,community_area_number,property_type,prperty_name,address,zip_code,phone_number,units,latitude,longitude
        [data amount]: All data
    - Zillow, The new Zillow API Network.
        [link]: "http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz1fqya3pv957_55f1z&address="+add+"&citystatezip=Chicago+IL&rentzestimate=true"
        [data type]: Xml
        [data columns used]: rentzestimate
        [data amount]: All data
    - Crimes - 2001 to present.
        [link]: "https://data.cityofchicago.org/api/views/ijzp-q8t2/rows.rdf?accessType=DOWNLOAD"
        [data type]: rdf
        [data columns used]: community_area
        [data amount]: All data
    - Openweathermap.org API.
        [link]: "http://api.openweathermap.org/data/2.5/weather?q=Chicago&appid=a60889d46a911b1a8698d131b54e93d8"
        [data type]: Json
        [data columns used]: weather[0]
        [data amount]: All data
    - Climate Data Online.
        [link]: "https://www.ncdc.noaa.gov/cdo-web/api/v2/datasets?datasetid=GHCND&locationid=ZIP:"+zip+"&startdate="+actualdate+"&enddate="+actualdate"
        [data type]: Json
        [data columns used]: All columns
        [data amount]: All data

    - Yes I used thr primary dataset
    - No  I used 2 from   data.gov
    - The others are fom zillow: https://www.zillow.com/howto/api/APIOverview.htm
    - And from Openweathermap.org API

4. This application focuses on Security, Distance and fun, in order to find a
   place near university of Chicago comfortable  for a student. I used different datasets to make this happen.
5. Map view
  i. Yes, the map focuses on the Department of Computer Science – University of Illinois in Chicago
  ii.  N
  iii. N
  iv.  N
  v.   N

6. Data Visualization
    i. Yes, all the information is described hen you click one of the houses available
    ii. There are no filters
    iii. Yes, when you click a house you will find all the info of each house and near places or crimes, also idraw a route from the house clicked to the Department of Computer Science – University of Illinois in Chicago.
    iv. First click the show me places button tu see all the rent posibilities
    v. For weather click weather button
7. Interaction Form
8. I used Bootstrap as framework
9. Test Case ttest in Chrome and Firefox
10. Problems: CORS problems in order to get zillow prices ypu have to install google chrome's cors extension here is a link:"https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi"
