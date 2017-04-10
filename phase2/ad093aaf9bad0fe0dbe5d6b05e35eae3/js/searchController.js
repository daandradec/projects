function sliderDistanceOnChange() {
    closeInfoPopUp(1);
    radiusSearch = ($("#sliderDistance").val()) * 1000;
    deleteAllMarkers();
    setOthers(pinUser);
    setDistanceText();
}

function setDistanceText() {
    $("#distanceKm").text(radiusSearch / 1000 + "Km.");
}

function setSliderDistance() {
    $("#sliderDistance").attr("max", radiusSearch / 1000000);
    radiusSearch = 3e3;
    $("#sliderDistance").val(radiusSearch/1000);
    setDistanceText();
}


function sliderPriceOnChange() {
    closeInfoPopUp(1);
    maxPrice = Number($("#sliderPrice").val());
    deleteAllMarkers();
    setOthers(pinUser);
    setPriceText();
}

function setMaxPrice(price) {
    $("#sliderPrice").attr("max", maxPrice);
    $("#sliderPrice").val(maxPrice);
    setPriceText();
}

function setPriceText() {
    $("#maxPriceSlider").text("$" + maxPrice);
}