# Chicago ARM (Accessible Rent Mashup)
                                                                 Author: Juan Sebastian Castelblanco Hernandez

### Key Words
Approach, Assurance, Comfort, Interactivity

### Datasets
* [Affordable Rental Housing Developments](https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD)
* [Points Traffic](https://data.cityofchicago.org/api/views/INLINE/rows.json?accessType=DOWNLOAD)
* [Libraries - Locations, Hours and Contact Information](https://data.cityofchicago.org/api/views/x8fc-8rcq/rows.json?accessType=DOWNLOAD)
* [Police Stations](https://data.cityofchicago.org/api/views/z8bn-74gv/rows.json?accessType=DOWNLOAD)
* [Parks - Facilities & Features](https://data.cityofchicago.org/api/views/y7qa-tvqx/rows.json?accessType=DOWNLOAD)
* [Divvy Bicycle Stations](https://data.cityofchicago.org/api/views/bbyy-e7gq/rows.json?accessType=DOWNLOAD)

Taken all from [Data.gov](https://www.data.gov/) in a JSON File, first data set has 263 rows with information about houses on rent: like specific ubication, contact phone numbers, property names, community areas which can be unifed later with others data set like transporting and security zones. Last data update on November 2016.

### Description
The web app will shows in a google map the houses can be rented nearly University of Illinois specifically Department of computer science. There is a marker that filters the results by price on the map. Left side at page one, show little bars with some "comfort indices" and an arrow that moves to the second page which displays basic information about houses on rent.


Map view (Actually):
Map shows location of renting houses provides by the data.gov api

Data Visualization:
Five lateral bars that shows the police stations, libraries, traffic, parks and bicycle stations 200 meters near the chosen marke

Interaction Form:
Menu with distances and animations.  
When the icons on the left side are pressed, the map shows itself the corresponding items, if the green arrow is clicked, it sends it to the general information of the rent. 

### Build Case
The web app uses HTML, Javascript and CSS, therefore does not require a very complex process of execution or access, just go to page

### Test Case
The proyect has been proven and optimized just for Chrome and Mozilla Firefox in full screen
