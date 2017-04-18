# Traveler Student Helper Tools (TSHT)

Problem addressed: Find me a safe and affordable place to rent near Department of Computer Science – University of Illinois, Chicago

Author: Alejandro Díaz Vecchio (aldiazve@unal.edu.co)

Description of the solution: We provide real-time data about which place is better to rent, according with differents custom filters like price, security, distance from the Department of Computer Science and more.

Keywords: Real State, Rend prices, Chicago, Real-time, Security, Lifestyle.

### Datasets used in Traveler Student Helper Tools (TSHT)

##### Libraries - Locations, Hours and Contact Information [source](https://catalog.data.gov/dataset/libraries-locations-hours-and-contact-information-f3c61)

Description:

Chicago Public Library locations, contact information, and hours of operation.

Data columns used:

data\[n\] = Library Info Object  
data\[n\]\[9\] = Library name  
data\[n\]\[10\] = Operation hours  
data\[n\]\[17\] = Phone  
data\[n\]\[18\] = Localization object  
data\[n\]\[18\]\[1\] = Latitude value  
data\[n\]\[18\]\[2\] = Longitude value  

- [ ] Do you use the primary dataset ”online climate data” from data.gov?
- [x] Are all these datasets from data.gov or data.indy.gov? If not, where are they coming from (links)?

### Introduction

Traveler Student Helper Tools (TSHT) is a web app that helps students to find a place to rent around their university. The strength of Traveler Student Helper Tools (TSHT) is the multiple search filters that are available, like police stations around the place, parks, hospitals, and more. Also Traveler Student Helper Tools (TSHT) can show recreation places around your choise, like distance to the beach, close restaurants and pubs, and more.

### Map View Info

- [x] Basic Map with specific location (your map is located in a meaningful place, city of west lafayette for example)

The default position of the map is the Department of Computer Science – University of Illinois, Chicago :
```javascript
const DCS_UI_POSITION = {lat: 41.870808, lng : -87.650390};
```
 
TODO:

- [ ] Markers for location of markets  
- [ ] Labels for markets' names  
- [ ] InfoWindow to show detail information of a market  
- [ ] Any other cover on the map (for example, cloud cover to show the weather effect)  


### Data visualization

- [ ] [describe] Use Graph? What is the type? (bar chart, pie chart, radar chart ...)
- [ ] [List] Any interaction available on the graph? List them (enable click on numbers, drag on lines, change time/variables ...)

### Interaction Form:

- [x] [Labels] Any information output? list them. (text field, text area, label, plain HTML ...)
- [x] [Work in progress] Any operation option (filters)? List them. (search markets, search vegetables, filter based on price, sort based on convenience ...)
- [x] [Work in progress] Any information input? List them. (comments, markers, user preference ...)
- [ ] [] Interaction with Map? List them. (filter on price will affect map markers, sort on price will affect map markers, ...)
- [ ] [] Interaction with data visualization? List them. (filter, sort, set variables ...)

### Build setup

I spend the whole first iteration learning how to use a couple of tools:

- [node.js](https://nodejs.org/en/)
- [browserify](http://browserify.org/)
- [babel](https://babeljs.io/)
- [boostrap](http://getbootstrap.com/)

But, to make easier the test of the project, I've made a bundle with all the necessary javascript code and the Boostrap.css file is also local. To do that I've used browserify and babel, also babel to be able to use ES6. So you only have to run the http-server using the tsht folder as root.

### Browsers support

Tested on:

- [x] Chrome 
- [ ] Firefox 
- [ ] Edge 
- [ ] Opera 

Successfully running on:

- [x] Chrome 
- [ ] Firefox 
- [ ] Edge 
- [ ] Opera 

### Particular problems and how I solved them.

1. sync functions:

At the very beginning of the contest I had to face a big problem: When I use a XTMHttpRequest to get the datasets info the sequential execution of the code was broken. So, first I thought that I can use EC6 to force the app to wait the response. Later I see that that solution wasn't user friendly, becouse the user has to wait without any feedback. So I re design the filters of the app to show a 'status'. The user can enable/disable a filter, like "Show libraries", but the button that alow that will be disable until the json was succefully loaded, on an error case, the button will show a "broken state", indicating him that the filter is not available (and will be not). 

Any way, I learn how to use browserify, babel, and a bit of node.js (the monitoring module particulary). But I spend a lot of time learnig all those things, so I'm in a hurry right now.