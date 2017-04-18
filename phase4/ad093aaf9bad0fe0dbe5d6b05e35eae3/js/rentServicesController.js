function setRentHouses(crimeTolerance) {
    var maxDistance = 0;
    var maxUnits = 0;
    var markerHouses = []
    $.ajax({
        url: urlARHD,
        type: "GET",
        dataType: "json"
    }).done(function (json) {
        $.each(json.data, function (i, house) {
            var info = {
                uuid: house[1],
                community_area: house[8],
                community_area_number: house[9],
                propertyType: house[10],
                propertyName: house[11],
                address: house[12],
                zip_code: house[13],
                phoneNumber: house[14],
                management_company: house[15],
                units: Number(house[16]),
                position: {
                    lat: Number(house[19]),
                    lng: Number(house[20])
                },
                distance: distanceMarkers({
                    lat: Number(house[19]),
                    lng: Number(house[20])
                }, pinUser.position),
                crimeDistInverse: []
            };
            if (info.units > maxUnits) {
                maxUnits = info.units;
            }
            if (info.distance > maxDistance) {
                maxDistance = info.distance;
            }
            markerHouses.push(info);
        });
        if (firstSet) {
            maxPrice = maxUnits;
            radiusSearch = maxDistance;
            setMaxPrice();
            setSliderDistance();
            firstSet = false;
        }
        filterHousesByDistancePrice(markerHouses, crimeTolerance);
    });
}

function getCrimeRate(markerHouses, crimeTolerance, bestOption) {
    var minCrimeEval = 10e6;

    var filterHouses = [];
    var bestHouse;
    $.ajax({
        url: urlCrime,
        type: "GET",
        dataType: "json"
    }).done(function (data) {
        $.each(data, function (i, crime) {
            if (crime.location) {
                position = {
                    lat: crime.location.coordinates[1],
                    lng: crime.location.coordinates[0]
                };
                $.each(markerHouses, function (i, house) {
                    var distance = distanceMarkers(position, house.position);
                    if (distance <= 1e3)
                        house.crimeDistInverse.push(7 / distance);
                });
            }

        });
        $.each(markerHouses, function (i, house) {
            var crimeEval = 0;
            $.each(house.crimeDistInverse, function (i, value) {
                crimeEval += value;
            });
            crimeEval = crimeEval / house.crimeDistInverse.length;
            if (crimeEval <= crimeTolerance) {
                filterHouses.push(house);
                if (minCrimeEval > crimeEval) {
                    minCrimeEval = crimeEval;
                    bestHouse = house;
                }
            }
        });
        if (bestHouse) {
            bestHouse.recommendedBy = "crimeEval";
            bestOption.push(bestHouse);
        }
        setMarkersHouses(filterHouses, bestOption);
    });

}

function filterHousesByDistancePrice(markerHouses, crimeTolerance) {
    var filterHouses = [];
    var bestOption = [];
    $.each(markerHouses, function (i, house) {
        if (house.distance <= radiusSearch) {
            if (house.units <= maxPrice) {
                filterHouses.push(house);
            }
        }
    });
    crimeTolerance ? getCrimeRate(filterHouses, crimeTolerance, bestOption) : setMarkersHouses(filterHouses, bestOption);
}

function setMarkersHouses(markerHouses, bestOption) {
    var minValue = 10e10;
    var minDistance = 10e10;
    var bestHouseDistance;
    var bestHousePrice;
    $.each(markerHouses, function (i, house) {
        pinHouse.title = house.uuid;
        pinHouse.position = house.position;
        markers[pinHouse.title] = {
            house: house,
            marker: addMarker(pinHouse, delayAnimation({
                position: positionInitialAll
            }, pinHouse))
        };
        setMarkerMouseOver(markers[pinHouse.title]);
        setMarkerClick(markers[pinHouse.title].marker);
        setMarkerRightClick(markers[pinHouse.title].marker);
        if (minDistance > house.distance) {
            minDistance = house.distance;
            bestHouseDistance = house;
        }
        if (minValue > house.units) {
            minValue = house.units;
            bestHousePrice = house;
        }
    });
    if (bestHousePrice) {
        bestHousePrice.recommendedBy = "priceEval";
        bestOption.push(bestHousePrice);
    }
    if (bestHouseDistance) {
        bestHouseDistance.recommendedBy = "distanceEval";
        bestOption.push(bestHouseDistance);
    }

    setBestOption(bestOption);
}

function setBestOption(bestOption) {
    $("#recommendedDiv").remove();
    var container = d3.select("#searchSideBar")
        .append("div")
        .attr("id", "recommendedDiv")
        .attr("class", "recDiv");

    var rowHouse = container.selectAll("div")
        .data(bestOption)
        .enter()
        .append("div");

    rowHouse.append("div")
        .attr("class", function (d) {
            return d.recommendedBy + "Row";
        })
        .attr("style", "padding: 0; margin-bottom: 0; font-size: 8pt; height: 15px; width: 25% ; text-align: center;")
        .html(function (d) {
            var innerHtml = "<strong>";
            switch (d.recommendedBy) {
                case "distanceEval":
                    innerHtml = ".: Closer :.";
                    break;
                case "priceEval":
                    innerHtml += ".: Best Price :.";
                    break;
                case "crimeEval":
                    innerHtml += ".: Safer :.";
                    break;
            }
            innerHtml += "</strong>";
            return innerHtml;
        });

    rowHouse.append("div")
        .attr("class", function (d) {
            return d.recommendedBy + "Row";
        })
        .on("click", function (d) {
            selectRowRecommended(d);
        })
        .on("mouseover", function (d) {
            $("." + d.recommendedBy + "Row").toggleClass("over");
        })
        .on("mouseout", function (d) {
            $("." + d.recommendedBy + "Row").toggleClass("over");
        })
        .html(function (d) {
            var innerHtml = "<strong>Propery name: </strong>" + d.propertyName + "<br/>" +
                "<strong>Propery type: </strong>" + d.propertyType + "<br/>" +
                "<strong>Adress: </strong>" + d.address + "<br/>" +
                "<strong>Phone: </strong>" + d.phoneNumber + "<br/>" +
                "<strong>Value: </strong> " + d.units + " units<br/>" +
                "<strong>Distance: </strong> " + (d.distance / 1000).toFixed(2) + "Km.";
            return innerHtml;
        });
    var bestPrice;
    var bestCrime;
    $.each(bestOption, function (i, house) {
        if (house.recommendedBy == "priceEval")
            bestPrice = house;
        if (house.recommendedBy == "crimeEval")
            bestCrime = house;
    });
    bestCrime ?
        selectRowRecommended(bestCrime, 3000) :
        bestPrice ? selectRowRecommended(bestPrice, 3000) :
        bestOption.length > 0 ? selectRowRecommended(bestOption[0], 3000) : mapClick();
    $("#searchResult").text(Object.keys(markers).length + " houses found...");
}

function selectRowRecommended(house, time) {
    $(".distanceEvalRow").removeClass("active");
    $(".priceEvalRow").removeClass("active");
    $(".crimeEvalRow").removeClass("active");
    setTimeout(function () {
        selectMarkerClick(markers[house.uuid].marker, time == 1);
        $("." + house.recommendedBy + "Row").toggleClass("active");
        animateMarker(markers[house.uuid].marker, time + 3000);
    }, time);
}