#! /usr/bin/env python3

import time
import sys
import os
import webbrowser

sys.path.append('.')

head = []

# climate data
# with open("C:\\Users\\theone\\PycharmProjects\\test\\recources\\926360.csv", "r") as climate_data:
with open("..\\resources\\926360.csv", "r") as climate_data:
    for line in climate_data:
        head = line.split(',')
        break

# for a in head:
#     print(a)

markets = {}
# farmer's market data
skip = 1
first = True
fmid_idx = 0
name_idx = 1
latitude_idx = 21
longitude_idx = 20
with open("..\\resources\\Farmers_market.csv", "r") as market_data:
    for line in market_data:
        if skip > 0:
            skip = skip - 1
            continue

        sp = line.strip().split(',')
        markets[sp[fmid_idx]] = [sp[name_idx], sp[latitude_idx], sp[longitude_idx]]
        print(markets[sp[fmid_idx]])

with open("..\\result.csv", "w") as file:
    # file.write("market,latitude,longitude\r")
    for id in markets:
        market = markets[id]
        file.write('%s,%s,%s\n' % (market[0], market[1], market[2]))
# show the result
webbrowser.open(".\\viewer.html")