# Welcome come to Ironhacks!

Keywords, brief description, a unique identifier of the author, browser within which it was tested (see our template for information)

Readme Introduction

This is a guide for how to set up your README.md file for your IronHack Application. The file should have following fields:

1. Name of your Application
 	* Farmer's market near me

2. Keywords
	* freshness, price, distance

3. Description of the datasets and function design
 * [name] [link] [data type] [data columns used] [data amount] Please provide a name+link+basicInfo to each dataset you have used.
 * [Y] Do you use the primary dataset ”online climate data” from data.gov? 
        This data is not yet used in the application, but in later phase, this data will be used.
 * [Y] [List] Are all these datasets from data.gov or data.indy.gov? If not, where are they coming from (links)?
       [United States Department of Agriculture -- Local Food Directories: National Farmers Market Directory] [https://www.ams.usda.gov/local-food-directories/farmersmarkets] 
       Some more data could be used in the future.
 
4. Brief Description
 
 	* This application is to provide the nearest local vendor to get a cheap and fresh vegetable.
 
 Fill in the structued description:
 * Map View:
	1. [Y] Basic Map with specific location (your map is located in a meaningful place, city of west lafayette for example)
	2. [Y] Markers for location of markets
	3. [Y] Labels for markets' names
	4. [Y] InfoWindow to show detail information of a market

 * Data Visualization:
	1. [Y] This application will use bar chart to show freshness, distance, and other things. 
	2. [Y] This application will enable click on markers in map.
	
 * Interaction Form:
	1. [Y] Distance from the user will be shown in text field. 
	2. [N] [List] Any operation option (filters)? 
	3. [Y] Input should be a location of the user (address).
	4. [N] Interaction with Map?
	5. [N] [List] Interaction with data visualization? 
  
5. Build Case
 	* Python3

6. Test Case
 	* Chrome

7. To excute the code:
	* Run python3 main.py. Note that Microsoft Edge is not compatible; Chrome browser is recommended.
