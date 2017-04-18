# IronHacks - Phase 4

In this fourth version, the application worked with more data sets, as well as improvements in graphical implementation.

1) **Name of Application:** Knowing Chicago. 

2) **Keywords.**
      * Safety
      * Supervised
      * Affordable Rental

3) **Datasets and function design.**

For now, the datasets used in the application are:

* [Police Stations] [https://catalog.data.gov/dataset/police-stations-3a3a8] [Location of the Chicago Police District Station.]

* [Affordable rental homes] [https://catalog.data.gov/dataset/affordable-rental-housing-developments-ef5c2] [Show affordable rental housing in the city of Chicago.]

* [Libraries] [https://data.cityofchicago.org/Education/Libraries-Locations-Hours-and-Contact-Information/x8fc-8rcq] [Libraries in the city of Chicago.]

* [Public Art] [https://data.cityofchicago.org/Parks-Recreation/Parks-Chicago-Park-District-Artworks/e9ef-hrzb] [Public Art at the Parks of the City of Chicago.]

* [Public Schools] [https://catalog.data.gov/dataset/chicago-public-schools-school-profile-information-sy1617] [Location and information for Chicago public schools.]

* [Parks] [https://catalog.data.gov/dataset/parks-chicago-park-district-facilities] [Location and information for Chicago parks.]

* [Farmers Markets] [https://catalog.data.gov/dataset/farmers-markets-2015] [Location and information for farmer markets in Chicago.]

* [Fire Stations] [https://catalog.data.gov/dataset/fire-stations-61d88] [Location and information for Chicago fire stations.]

** [Y / N] All these datasets from data.gov or data.indy.gov? If not, where do they come from? ** Yes.


4) **Description.**

The application seeks to provide assistance to new students in the Department of Computer Science - University of Illinois, who have no knowledge of the city of Chicago, especially near the university. The application at this time, offers on the map police stations, libraries, public art, affordable housing, public schools, fire stations, parks and farmers markets in the city of Chicago. Also, the app offers the best profitable houses and allows the user to compare the houses in different aspects.
 
**Map View:**

* **[Y/N] Basic Map with specific location (your map is located in a meaningful place, city of west lafayette for example)**  Yes, Department of Computer Science – University of Illinois, Chicago (41.8708° N, 87.6505° W)

* **[Y/N] [describe] Any other cover on the map (for example, cloud cover to show the weather effect)**  Yes, a circle centered on a police station, another in a library and another in a rental house, fire station, farmer market, public school, park. These represent the closest supervised area, the nearest library area, the nearest profitable home area, the nearest fire station, the nearest farmer market, the nearest public school and the nearest park, respectively.

**Data Visualization:**

* **[Y/N] [describe] Use Graph? What is the type? (bar chart, pie chart, radar chart ...)**  Yes, A bar chart to visualize every aspect to take into account to choose the best house

* [Y / N] [List] Any interaction on the graph? List them (enable click on numbers, drag on lines, change
Time / variables ...) ** Yes, at this time, in addition to having the interaction with the map with a custom button that allows the user to return to the Department of Computer Science - University of Illinois, Chicago (41.8708 ° N , 87.6505 ° W). And the "choose option" button, you can click on each marker, to see your information. In addition, when obtaining the information of a public artwork will be able to search this one in google images by means of a button.

**Interaction Form:**

* **[Y/N] [List] Any information output? list them. (text field, text area, label, plain HTML ...)**  Yes, information about each marker, application conventions, a brief description of each stock and the comparison in each affordable rental housing are shown.

* **[Y/N] [List] Any operation option (filters)? List them. (search markets, search vegetables, filter based on price, sort based on convenience ...)**  Yes, Dropdown that allows to choose the information that the user wants, for example: Search Police Stations.

* **[Y/N] [List] Interaction with Map? List them. (filter on price will affect map markers, sort on price will affect map markers, ...)**  Yes, Click on a selection to see their information.

* **[Y/N] [List] Interaction with data visualization? List them. (filter, sort, set variables ...)**  Yes, with each set of data the best area closest to the university is observed. Also, different features are observed when selecting a profitable home rental.

5) **Test Case.**

**Which browsers did you test your project on? Chrome, IE, Edge, Safari, or Firefox?**  Google Chrome, Mozilla Firefox, Microsoft Edge.