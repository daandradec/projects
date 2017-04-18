#! /usr/bin/env python3

import time
import sys
import os
import webbrowser

sys.path.append('.')

head = []
temp_data = {}
first = True
date_idx = -1
tmax_idx = -1

# climate data
with open("..\\resources\\926360.csv", "r") as climate_data:
    idx = -1;
    for line in climate_data:
        if first:
            head = line.split(',')
            for column in head:
                idx = idx + 1
                if 'DATE' in column:
                    date_idx = idx
                elif 'TMAX' in column:
                    tmax_idx = idx;
            first = False
            continue
        cols = line.split(',')
        date = cols[date_idx][4:6]
        tmax = cols[tmax_idx]

        if '9999' in tmax:
            continue

        if date not in temp_data:
            temp_data[date] = 0;
            temp_data[date] = int(tmax);
        else:
            temp_data[date] = int((temp_data[date] + int(tmax)) / 2)

        # print(date),
        # print(tmax)


# read seasonal vegetables
vegetables = {}
keys = list(temp_data.keys())
for k in keys:
    vegetables[k] = []

with open('..\\resources\\Seasonal_Vegetables.csv', 'r') as file:
    for line in file:
        sp = line.strip().split(',')
        name = sp[0]
        for x in range(0,12):
            if '1' in sp[x+1]:
                key = keys[x]
                vegetables[key].append(name)

with open('.\\climate.tsv', "w") as file:
    file.write('yearmonth\tmaxtemp\tvegetables\n')
    idx = 0
    for date in temp_data:
        data = temp_data[date]
        file.write('%s\t%s\t%s\n' % (date, data, "<br>".join(vegetables[keys[idx]])))
        idx = idx + 1





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

with open(".\\result.csv", "w") as file:
    # file.write("market,latitude,longitude\r")
    for id in markets:
        market = markets[id]
        file.write('%s,%s,%s\n' % (market[0], market[1], market[2]))
# show the result
# webbrowser.open(".\\viewer.html")