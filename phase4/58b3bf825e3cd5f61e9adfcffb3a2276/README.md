# Problem addressed: Places near Chicago University to rent
## Preview this project on http://cesarochoa2006.github.io in #firefox browser
## Name of project: aPlace2me
## Author: Cesar Ochoa (clochoac@unal.edu.co)

### Description of the solution:
A place to me is the first version of an web-app that helps you as a student of the Purdue Computer Science program who moves to Chicago. In a first view, you will find a step by step style site, where you simple click and go to the designed function. All the code can be found in source directory. First, user see a nice welcome page, with some features and basic recopiled info of chicago city while the
necessary data loads. When it is ready, a button to start is showed to user. (See Aditional notes). When a user goes on, will see a map with some places and a little description of each one as a leyend mode. The place's description are listed below. User can easily find a
go button and an options button. Go button do the job!, i mean, go button shows to user a map with a places available to rent, and user can select between some filtering options, to reduce places number according to particular needs. Then, user can click a place for more information, and next, will find some informations and two new buttons, they are a "show route" button and a "view more info" Button. In the first one, will find detailed information about the clicked place, with near places description, possible rental cost based in the actual Chicago rent price media and the units of the place and scoring graphics, and with the second one, user will see the fastest route to the clicked place starting from the university. Last but not least, user can select another place to see more info and to compare, and the system will retain information of the last clicked place, and user can select more than one filtering options.

### Keywords:
 Traffic Performance, Crime rates, Places Near, affordable rental sites, safe places to rent,

### Datasets implemented:
1.	Affordable Rental Housing Developments: https://catalog.data.gov/dataset/affordable-rental-housing-developments-ef5c2
aPlace2me search rental info from this dataset and calculates the distance between the University and the locations for rent offered by this dataset. It seems to has a more-or-less update rate.
2.  Crimes - One Year to present: https://catalog.data.gov/dataset/crimes-one-year-prior-to-present-e171f
There is a LOT of information about all kinds of crimes offered by this dataset, i used this to search near crimes which can be
considered several, and for this, i considerate only domestic crimes, because the goal of aPlace2me is just offering user a domestical tool infomation of rent sites.
3.  Chicago Traffic Congestion estimated by regions https://data.cityofchicago.org/Transportation/Chicago-Traffic-Tracker-Congestion-Estimates-by-Re/t2qc-9pjd/data
Transport is important, for this reason i used this. Because there is a lot of difference in a 20 minutes transportation time and a 2 hour transport time. This is a very very updated dataset, and the information found here can be consider time real.
4. Produce Carts: https://data.cityofchicago.org/Community-Economic-Development/Produce-Carts/divg-mhqk/data
I felt impressed by the support from the us goverment to low resources people, for this reason i implemented this, a
fully complete dataset about produce carts that can be found near some places in the city in the case that user want to find a
fast street food solution.
5. Fire Stations - https://catalog.data.gov/dataset/fire-stations-61d88
Stay alert for emergencies is great, but not all accidents or mishaps can be prevented; for this, a near
fire station never be left.
6. Libraries- 2016 Visitors by location - https://catalog.data.gov/dataset/libraries-2016-visitors-by-location
As tool designed for academic people, i thought a library near is important to spend time or just study and look for information.
7. Climate Data Online - https://www.ncdc.noaa.gov/cdo-web
Initially thought to implement this to obtain climatic information about certain specific places, unfortunately for this type of use this dataset does not have complete and accurate information, so i used it to display global information.
8. Police Stations - https://catalog.data.gov/dataset/police-stations-3a3a8
For a call-quick response, there is no better than have a police station near home.
9. Public health clinics - https://catalog.data.gov/dataset/chicago-department-of-public-health-clinic-locations-0cc3b
Nobody knows when will be sick, so in addition to public hospitals, aPlace2me offers information about nearby clinics
10. Divvy Bici Stations - https://catalog.data.gov/dataset/divvy-bicycle-stations-3353a/resource/68a7d6a6-819c-4528-845e-cd10980dbf2f
I consider biking a good and healthy practice, for this reason, if you want to be a "one car less", this can be a good option, so
aPlace2me offers you a near from home places where you can pick up and return bicicles

### Aditional Notes:
- Aditional information about the datasets used, for example, columns data, and other info can be found in the source code.
- Map View: First Map view offers places of interest that was analized from the described datasets, but when runs, show map with information of home locations, distance and near places. User can click the icons showed on map. Icons have labels, and home icons have some little data when clicked with infowindows.
- For Scoring, i used a bar chart based on the number of near places, this was analized in base of the total number of sites,
the  information that can be found in the datasets and a 10% raw choose mode. The bar chart was displayed with d3 Libraries.
- Some animations was only javascript-jquery code, other was done with help of d3 libraries.
- Some information is displayed in tables and other is displayed in "interactive" text mode.
- Filters can be applied guided by user preferences about importance of crimes, healthy, traffic or near places.
- Data displayed has no specific order or not be sorted, but keep in mind that the datasets offers the data in sorted order. For example, the crimes data is sorted by antiquity. Also, aPlace2me is the most minimalisted possible when data is displayed.
- Collecting the crimes data takes the longest time, for that reason, aPlace2me shows a message when user start and crime info has not loaded yet.
- The way that aPlace2me is displayed varies from browser to browser and it seems to pass working test on Google Chrome, Firefox, and edge explorers , but i recommend last firefox version to use it.
- The distance of the near places to the university seems raw, but it doesn't, it was calculated in base to the data collected of the datasets.

###Known bugs
- Sometimes, the crimes data is never completed, (not really, but sometimes it takes A LOT of time to complete collecting data, and i am so impatient ;) ) so user have to restart. It seems that it depends on the internet speed and ram of the machine where is executed.
- Sometimes, due to the high load of information, user have to re-click houses icons to see the infoWindows, but the good news is that the other functions, like clicking the View Data Button, it isn't affected.
- Zoom preferences seemt to be variant where user changes the explorer.
- In Edge explorer, zome things changes the intended size.
- Some times occurs that, the bars and score is not accurate, but the overall score of the house is the correct. 
