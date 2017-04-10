# IronHacks - phase 2

#### Miguel Angel Borja Acevedo - miaborjaac@unal.edu.co

In this second version, the application improved the graphical implementation in the presentation, design and visualization usability. In addition, working with a first set of data (Police stations)

1) **Name of Application:** Knowing Chicago. 

2) **Keywords.**
      * Safety
      * Supervised
      * Information

3) **Datasets and function design.**

For now, the data set used in the application is:

* [Police Stations] [https://catalog.data.gov/dataset/police-stations-3a3a8] [Chicago Police district station locations.]

**[Y/N] Do you use the primary dataset ”online climate data” from data.gov?**  Not yet.

**[Y/N] Are all these datasets from data.gov or data.indy.gov? If not, where are they coming from (links)?**  Yes.


4) **Description.**

The application seeks to provide assistance to new students from the Department of Computer Science - University of Illinois, who have no knowledge of the city of Chicago, especially near the university. The application at the moment, offers on the map the police stations of the city of Chicago, besides giving the zone watched by one of these stations closer to the university
 
**Map View:**

* **[Y/N] Basic Map with specific location (your map is located in a meaningful place, city of west lafayette for example)**  Yes, Department of Computer Science – University of Illinois, Chicago (41.8708° N, 87.6505° W)

* **[Y/N] Markers for location of markets**  No.

* **[Y/N] Labels for markets' names**  No.

* **[Y/N] InfoWindow to show detail information of a market**  No.

* **[Y/N] [describe] Any other cover on the map (for example, cloud cover to show the weather effect)**  Yes, A circle centered on a police station. It represents the monitored area closest to the university.

**Data Visualization:**

* **[Y/N] [describe] Use Graph? What is the type? (bar chart, pie chart, radar chart ...)**  Not.
* **[Y/N] [List] Any interaction available on the graph? List them (enable click on numbers, drag on lines, change time/variables ...)**  Yes, At this time in addition to having the interaction with the map having a custom button that allows the user to return to Department of Computer Science – University of Illinois, Chicago (41.8708° N, 87.6505° W). and the "choose option" button, you can click on each police station to observe their information.

**Interaction Form:**

* **[Y/N] [List] Any information output? list them. (text field, text area, label, plain HTML ...)**  Yes, In a paragraph of a div, information about each police station is displayed. Another div shows the conventions of the application.

* **[Y/N] [List] Any operation option (filters)? List them. (search markets, search vegetables, filter based on price, sort based on convenience ...)**  Yes, Dropdown that allows to choose the information that the user wants, for example: Search Police Stations.

* **[Y/N] [List] Any information input? List them. (comments, markers, user preference ...)**  No.

* **[Y/N] [List] Interaction with Map? List them. (filter on price will affect map markers, sort on price will affect map markers, ...)**  Yes, Click on a police station to see their information.

* **[Y/N] [List] Interaction with data visualization? List them. (filter, sort, set variables ...)**  Yes, With the data set of the police stations is the monitored area closest to the university.

5) **Test Case.**

**Which browsers did you test your project on? Chrome, IE, Edge, Safari, or Firefox?**  Chrome.