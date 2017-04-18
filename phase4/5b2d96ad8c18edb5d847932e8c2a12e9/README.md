Readme Introduction

1. Name of your Application: Vegitable Provider Lookup Application

2. Keywords: price, transportation, variety

3. Description of the datasets and function design
 * [NOAA Climate Data Online] [https://www.ncdc.noaa.gov/cdo-web/] [Climate Data] [data columns used] [data amount] 
 * [Argricultural Marketing Service] [hhttps://www.ams.usda.gov/local-food-directories/farmersmarkets] [Market Location Data] [data columns used: 3] [3 for Version 1.0]
 * [VegScape][https://catalog.data.gov/dataset/vegscape-vegetative-condition-explorer][Vegitable condition data]
 * [US Forest Service Motor VEhicle Use Map][https://catalog.data.gov/dataset/vegscape-vegetative-condition-explorer][Travel Information]
 * [National Solar Radiation Data Base][http://rredc.nrel.gov/solar/old_data/nsrdb/][Solar Radiation Data]

 * Do you use the primary dataset ”online climate data” from data.gov? 
 YES(Although it's not working yet)

 * Are all these datasets from data.gov or data.indy.gov? If not, where are they coming from (links)?
 Market Data is from USDA.gov, travel information and vegitable condition data are from data.gov, solar radiation data is not from data.gov

4. Brief Description

 * Use a paragraph to introduce your project.
 *Map View
 Map is loacted in Purdue University and includes West Lafayette and Lafayette(The Great Lafayette Area). There're data files for the location of markets but implementation is not doen yet, and so does labels for markets' names and info window.
 Weather data is not being implemented yet.

*Data Visualization
Plan to use pie chart(due to time it's not done yet)


5. Build Case
tested intergrading .json file with chrome and it seemed not working so I include the json file in the .html file.
Next step is about intergrating the solar data with weather data, GevScape data and traveling information data in the .html file with click() setup for google map.

6. Test Case
Chome, Safari, IE, Edge

7. Additional information You Want to Share with Us
Climate data token does not work for html.
Google map marker finally worked with inforwindow!
