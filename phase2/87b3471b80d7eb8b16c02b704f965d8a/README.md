Readme Introduction

This is a guide for how to set up your README.md file for your IronHack Application. The file should have following fields:

1. Name of your Application: Chicago House Finder

2. Keywords: Crime heatmap, Apartment markers, Google maps

3. Description of the datasets and function design
 * [name] [link] [data type] [data columns used] [data amount] Please provide a name+link+basicInfo to each dataset you have used.
 * Not using climate dataset
 * All datasets used come from the recommended datasets list

4. Brief Description

 * Find cheap and safe rental options in Chicago, using google maps to point the exact location of the houses. Compare the heatmap of the crimes around chicago with the place you want to live in, so you can always choose the safest option.

 Fill in the structued description:
 * Map View:
	1. Basic Map centered on the University of Illinois at Chicago
	2. Markers for the location of available houses
	3. Labels for house names
	4. InfoWindow to show detail information of a house
	5. Crime heatmap highligths the most dangerous places around chicago

 * Data Visualization:
	1. No graphs are being used
	
 * Interaction Form:
	1. Text area shows all the info of a selected house
	2. [Y/N] [List] Any operation option (filters)? List them. (search markets, search vegetables, filter based on price, sort based on convenience ...)
	3. [Y/N] [List] Any information input? List them. (comments, markers, user preference ...)
	4. [Y/N] [List] Interaction with Map? List them. (filter on price will affect map markers, sort on price will affect map markers, ...)
	5. [Y/N] [List] Interaction with data visualization? List them. (filter, sort, set variables ...)

5. Build Case
No external dependencies are beign used. The html makes import calls only to Bootstrap and jQuery.

6. Test Case
The project works correctly on the latest version of Chrome for Windows 10

7. Additional information You Want to Share with Us
-I've been having a lot of trouble getting two of the most important APIs to work with the project, Zillow and NOAA weather. This will be fixed at a later date.
-The design of the webpage is heavily based on the sample project provided on the IronHacks tutorial, but the css and style may change at any point during development
-I've learned so many things about web development in less than a month!