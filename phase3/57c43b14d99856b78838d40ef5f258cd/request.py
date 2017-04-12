from urllib2 import urlopen, Request
import json
import urllib2
import random

#Library for Data Science
import pandas as pd

class Request:

    def __init__(self):
        #Take a moment load the information
        self.houses_data = self.get_houses()
        self.health_data = self.get_health_statistics()

    """
        Get the houses for rent
    """
    def get_houses(self):
        url = "https://data.cityofchicago.org/resource/uahe-iimk.json"
        data  = urllib2.urlopen(url)

        #Tricky part
        result = json.load(data)
        aux = json.dumps(result)
        aux2 = json.dumps(json.loads(aux))

        #Data Frame
        data_frame =  pd.read_json(aux2)
        data_frame = data_frame.dropna()
        return data_frame

    """
        Get information about the health in a community
    """
    def get_health_statistics(self):
        url = "https://data.cityofchicago.org/resource/iqnk-2tcu.json"
        data = urllib2.urlopen(url)

        #Tricky part
        result = json.load(data)
        aux = json.dumps(result)
        aux2 = json.dumps(json.loads(aux))

        #Data Frame
        data_frame =  pd.read_json(aux2)
        data_frame = data_frame.dropna()

        return data_frame

        """
            Get the weather based on ZIP code
        """
    def get_weather(self,locationid="60007",startdate="2016-05-01", enddate="2016-05-31", datasetid="GSOM"):
        url = "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?"+ \
          "datasetid={}"+ \
          "&locationid=ZIP:{}"+ \
          "&startdate={}"+\
          "&enddate={}"

        url = url.format(datasetid, locationid, startdate, enddate)
        token = "xtLJFvVAFGacWOPnHFCOJvAfwVhVPFmI"
        request = Request(url)
        request.add_header('token', token)
        response = json.load(urlopen(request))
        return response

    """
        Get locations houses.
    """
    def get_locations_houses(self):
        locs = self.houses_data[["latitude", "longitude", "address", "community_area_number", "community_area", "phone_number", "property_name", "property_type", "zip_code"]]
        locs_js = locs.to_json()
        return locs_js

    """
        Get number of houses by comunity.
    """
    def get_number_by_comunity(self):
        _counts = self.houses_data["community_area"].value_counts()
        #_counts_js = _counts.to_json()
        #print(_counts_js)
        values = _counts.values
        labels = _counts.index.values
        colors = []
        #Create random colors
        for i in values:
            r = random.randint(0,255)
            g = random.randint(0,255)
            b = random.randint(0,255)
            colors.append("rgb({},{},{})".format(r,g,b))


        return labels, values,colors

    def get_information_comunity(self):
        info = self.health_data[["community_area", "cancer_all_sites", "below_poverty_level", "birth_rate", "per_capita_income", "community_area_name", "crowded_housing", "infant_mortality_rate", "assault_homicide", "unemployment"]]
        info_js = info.to_json()
        return info_js
    

if(__name__ =="__main__"):
    a = Request()
    print(a.get_information_comunity())
