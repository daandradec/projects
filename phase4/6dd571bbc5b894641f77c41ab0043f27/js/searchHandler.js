function sliderDistanceOnChange() {
    radiusSearch = ($("#sliderDistance").val()) * 1000;
    deleteAllMarkers();
    loadDataInitial(pinUser);
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
    maxPrice = Number($("#sliderPrice").val());
    deleteAllMarkers();
    loadDataInitial(pinUser);
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