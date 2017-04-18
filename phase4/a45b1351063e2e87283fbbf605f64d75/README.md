# Purdue-UNAL Gold IronHacks 2017

### Introduction   


This is a tutorial project for Ironhacks. An application that gives solution to find a safe place to rent near the Department of Computer Science - University of Illinois, Chicago

### Development Process

1. Explore the datasets

   The first dataset is [Affordable Rental Housing Developments](https://catalog.data.gov/dataset/affordable-rental-housing-developments-ef5c2)

   This dataset is a rental housing developments are supported by the City of Chicago to maintain affordability standards in the city. 
   
   The second dataset is [Crimes - 2001 to present](https://data.cityofchicago.org/Public-Safety/Crimes-2001-to-present/ijzp-q8t2)
   
   This dataset reflects reported incidents of crime that occurred in the City of Chicago from 2001 to present, minus the most recent seven days. Data is extracted from the Chicago Police Department's CLEAR (Citizen Law Enforcement Analysis and Reporting) system. In order to protect the privacy of crime victims, addresses are shown at the block level only and specific locations are not identified. 
   
   The third dataset is [Bike Racks](https://data.cityofchicago.org/Transportation/Bike-Racks/cbyb-69xx)
   
   This dataset contains places where parking is available for bicycles
   
   The the fourth dataset contains Weather data.

2. Identify the solution to be implemented and their associated keywords

    This web application is intended to help foreign students who come to the University of Illinois in Chicago to find a place to stay during their stay, analyzing the different factors that can be decisive at the time of the election. Keywords: safe, place, crime, price, site, vicinity.

   At the moment the application has a map with the different sites that are available to rent in the city of Chicago, and has information of the place for rent, as well as information of interest such as: percentage of security in the area and distance to the university .
   
3. Brief Description.

    * Mapa view:
        1. Basic Map with specific location
        2. Markers for location of rental housing
        3. Line between the house for rent and the university
     
   * Data House:
        1. Area Name: The name of the area in the city
        2. Area Number: The number of the area in the city
        3. Property Type: The type of property that is the dwelling
        4. Property Name: The name of property that is the dwelling
        5. Phone Number: The owner's cellular number
        6. Company: Company leasing house

   * General information:
        1. Percentage of crimes: Percentage of crimes committed in the area of the house for rent, where 100% is the total number of crimes in the city.
        2. Distance from university: Distance in kilometers from the university to the house for rent
        3. Bicycle rack nearby: Amount of bicycle parking in the community area.
        
    * Weather:
         1. Weather condition
         2. Temperature
         3. Humidity
         4. Minimum temperature at the moment
         5. Maximum temperature at the moment
        

4. This web was tested for browsers: Chrome, Safari and Firefox.
