function sliderDistanceOnChange() {
    radiusSearch = ($("#sliderDistance").val()) * 1000;
    setDistanceText();
}

function setDistanceText() {
    $("#distanceKm").text(radiusSearch / 1000 + "Km.");
}

function setSliderDistance() {
    $("#sliderDistance").attr("max", radiusSearch / 1000000);
    radiusSearch = 3e3;
    $("#sliderDistance").val(radiusSearch / 1000);
    setDistanceText();
}


function sliderPriceOnChange() {
    maxPrice = Number($("#sliderPrice").val());
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

function crimeCheckClick() {
    if ($("#checkCrime").prop("checked")) {
        $("#sliderCrimeDiv").css("display", "block");
        setCrimeLayer();
    } else {
        $("#sliderCrimeDiv").css("display", "none");
        removeCrimeLayer();
    }
}

function setMaxCrime() {
    $("#sliderCrime").val(crimeMaxTolerance * 1000);
    $("#checkCrime").prop("checked", true);
    $("#sliderCrimeDiv").css("display", "block");
    setCrimeLayer();
}

function setCrimeText() {
    $("#sliderCrime").text(crimeMaxTolerance + "%");
}

function sliderCrimeOnChange() {
    setCrimeText();
}

function searchClick() {
    maxPrice = Number($("#sliderPrice").val());
    radiusSearch = ($("#sliderDistance").val()) * 1000;
    crimeMaxTolerance = ($("#sliderCrime").val()) / 1000;
    closeSideBarR();
    deleteAllMarkers();
    closeInfoPopUp(1);
    if ($("#checkCrime").prop("checked")) {
        setOthers(crimeMaxTolerance);
    } else {
        setOthers();
    }
}