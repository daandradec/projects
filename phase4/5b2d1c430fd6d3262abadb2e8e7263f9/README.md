# Idea

As of now, my idea for the hack is to build a site where people can look for specific fruits and vegetables. They would be filtered according to the season and weather. The map would show the possible places to buy them, along with the price and other details.

I'd be changing/tweaking the idea as the weeks go by.

I'm intending to build a react app, for which the first phase submission would be the barebones template.

# Current state

As of now, the App just loads a map centered at Lafayette/West Lafayette, along with two cards floating on it. One would contain the UI for the search and filtering. The second would contain the data for the selected fruit/vegetable/shop. For now, both of them have placeholders.

I really like the Google Maps UI, so I'm attempting to mimic the same in my App, which is quite evident already!

_Phase 2:_
The app was already in a working condition in phase 1, where it displays map with two UI elements which would contain the search and results. So this phase was mostly data collection. I've been looking at the climate dataset along with my other selected datasets.

# Instructions

To run the app, first navigate to its directory, then install the required dependencies by:
```sh
npm install
```
Once that is finished, start a local dev server to run the app by:
```sh
npm start
```

Open http://localhost:3000 to view it in the browser.

# APIs to be used

The APIs I've decided to use are:

* _Mandatory Climate Dataset_ -
https://www.ncdc.noaa.gov/data-access/quick-links#loc-clim
  * For getting the climate data, which would be used to filter the vegetables and fruits (seasonal, etc. )

* _Fruit and Vegetable Market News Division of the Fruit and Vegetable Programs_-
https://marketnews.usda.gov/mnp/fv-report-retail?portal=fv&startIndex=1&class=ALL&region=NATIONAL&organic=ALL&commodity=ALL&reportConfig=true&dr=1&repType=wiz&step2=true&run=Run&type=retail&locChoose=location&commodityClass=allcommodity
https://catalog.data.gov/dataset/fruit-and-vegetable-market-news-custom-search
  * For getting the list of fruits/vegetables and their average price.

* _VegScape_ -
https://catalog.data.gov/dataset/vegscape-vegetative-condition-explorer
  * For getting the condition of the fruits/vegetables and check if they are appropriate for the current season/weather as well as the freshness and other factors.

* _Farmers Market_ -
https://search.ams.usda.gov/farmersmarkets/v1/svcdesc.html
  * Get a list of Stores (Farmers Market)
