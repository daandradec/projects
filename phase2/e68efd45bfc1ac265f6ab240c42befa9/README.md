# Welcome come to Ironhacks!

## Finding Home

A web app to find a safe and affordable place to rent near Department of Computer Science – University of Illinois, Chicago. I will use some interactive visualization to make easier make a choice.

I will visualize data in two ways, the first will be the standard way with charts and the second will be a map visualize data, e.g., heap maps

Keywords: near, housing, safety, open data, bicycle, facilities

### DataSets

- [Climate Data Online](https://www.ncdc.noaa.gov/cdo-web/) datasets:
  - [GHCND](https://www.ncdc.noaa.gov/oa/climate/ghcn-daily/) (Global Historical Climatology Network - Daily) - Reports of climate data (temperature, precipitation, wind speed) by day, is one of the most updated datasets in de NOAA's web API.

    Problems: A lot of [data types](https://www.ncdc.noaa.gov/cdo-web/webservices/v2#dataTypes) are missing, depends on the location.   
  - [Quality Controlled Local Climatological Data](https://www.ncdc.noaa.gov/data-access/land-based-station-data/land-based-datasets/quality-controlled-local-climatological-data-qclcd) A more detailed report of weather, with daily and hourly reports.

    Problems: This datasets don't have an web API, therefore, is difficult to get the data. The [Plenar.io API](http://docs.plenar.io/#get-v1-api-weather-daily) make easier to use this dataset


 - [Affordable Rental Housing Developments](https://catalog.data.gov/dataset/affordable-rental-housing-developments-ef5c2) - Rental Housing data from Chicago

 Columns used: address, community_area, community_area_number, management_company, phone_number, property_name, property_type, zip_code

 - [Crimes - 2001 to present](https://catalog.data.gov/dataset/crimes-2001-to-present-398a4)

- Do you use the primary dataset ”online climate data” from data.gov? Yes
- Are all these datasets from data.gov or data.indy.gov? Yes

## Libraries

- [Mapbox GL JS](https://github.com/mapbox/mapbox-gl-js): A map library like google maps.
- [D3.js](https://github.com/d3/d3): Is a JavaScript library for visualizing data using web standards. Also, include a statistic and  programing useful functions.
- [C3.js](https://github.com/c3js/c3): Is a D3-based reusable chart library that enables deeper integration of charts into web applications.
- [Highcharts JS](https://github.com/highcharts/highcharts): Is a JavaScript charting library based on SVG, with fallbacks to VML and canvas for old browsers.
- [JQuery](https://github.com/jquery/jquery): A library for DOM manipulation, animation, event handling, AJAX requests and more.

- [Soda js](https://github.com/socrata/soda-js): A client implementation of the Socrata Open Data API

- [Plenar.io](https://github.com/UrbanCCD-UChicago/plenario): API for geospatial and time aggregation across multiple open datasets.

- [Semantic UI](https://github.com/semantic-org/semantic-ui/): Is a UI framework designed for theming and build beautiful websites.

## Project

With this App I try to use explore the D3 library and some others like C3, public datasets to make information to improve decisions, explore the options of integrate Mapbox with D3, and learn to make a useful web app with javascript.
## Map View
- Basic Map with specific location - Yes, Chicago
- Markers for location of houses - Yes, the map has markers for location of affordable rental housing
- Labels for house's names - Yes
- InfoWindow to show detail information of a houses - Yes, Popups
- Any other cover on the map (for example, cloud cover to show the weather effect) - Yes

## Data Visualization
- Use Graph? What is the type? (bar chart, pie chart, radar chart ...) - Yes, bar chart, pie chart, line chart, spline chart
- Any interaction available on the graph? Yes, remove and add data, change between charts, remove and overlapping layers in the map

## Interaction Form:

- Any information output? list them. (text field, text area, label, plain HTML ...) - Not yet
- Any operation option (filters)? List them. (search markets, search vegetables, filter based on price, sort based on convenience ...) - Not yet
- Any information input? List them. (comments, markers, user preference ...) - Yes
Interaction with Map? List them. (filter on price will affect map markers, sort on price will affect map markers, ...) - Not yet
- Interaction with data visualization? List them. (filter, sort, set variables ...) - Not yet

## Test Cases
- Chrome: works perfect
- Firefox: works perfect
- IE: the Map don't work 'cause a security problem
- Edge: the Map don't work 'cause a security problem
