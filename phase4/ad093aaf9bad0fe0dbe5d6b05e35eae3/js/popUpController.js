function toogleSideBarR() {
    $(".closeBtnR").toggleClass("active");
    if (openSide) {
        $(".map").animate({
            width: "100%"
        }, 500);
        $(".tabInfoSideBar").animate({
            right: "0%"
        }, 500);
    } else {
        $(".map").animate({
            width: "65%"
        }, 500);
        $(".tabInfoSideBar").animate({
            right: "35%"
        }, 500);
    }
}

function toogleSideBarL() {
    if (openSideL) {
        $(".divSideNavL").fadeOut(1);
        $("#recommendedDiv").fadeOut(1);
        $("#btnCloseSidebarL").animate({
            left: "0%"
        }, 500);
        $("#searchSideBar").animate({
            width: "1px"
        }, 500);
        openSideL = true;
    } else {
        $("#btnCloseSidebarL").animate({
            left: "25%"
        }, 500);
        $("#searchSideBar").animate({
            width: "25%"
        }, 500);
        openSideL = false;
        setTimeout(function () {
            $(".divSideNavL").fadeIn(250);
            $("#recommendedDiv").fadeIn(250);
        }, 400);
    }
    $(".closeBtnL").toggleClass("active");

}

function closeSideBarRBtn() {
    toogleSideBarR();
    openSideAgain = false;
    openSide = false;
}

function openSideBarR() {
    !openSide ? toogleSideBarR() : null;
    openSide = true;
    openSideAgain = true;
}

function closeSideBarR() {
    toogleSideBarR();
    openSide = false;
}

function closeSideBarL() {
    openSideL ? toogleSideBarL() : null;
    openSideL = false;
}

function openSideBarL() {
    !openSideL ? toogleSideBarL() : null;
    openSideL = true;
}

function closeSideBarLBtn() {
    toogleSideBarL();
    openSideL = !openSideL;
}

function openContextMenu(position) {
    closeContextMenu(1);
    $("#contextMenu").offset({
        top: 0,
        left: 0
    });
    $("#contextMenu").offset({
        top: position.y,
        left: position.x
    });
    $("#contextMenu").fadeIn(250);

}

function closeContextMenu(delay) {
    delay ?
        $("#contextMenu").fadeOut(delay) : $("#contextMenu").fadeOut(100);

}

function openInfoPopUp(position) {
    closeInfoPopUp(1);
    $("#infoPopUp").animate({
        top: position.y,
        left: position.x
    });
    $("#infoPopUp").fadeIn(250);
}

function closeInfoPopUp(delay) {
    delay ?
        $("#infoPopUp").fadeOut(delay) : $("#infoPopUp").fadeOut(250);

    $("#infoPopUp").offset({
        top: 0,
        left: 0
    });

    $("#infoPopUp").css("display", "none");
}

function blockRightClick() {
    $("body").contextmenu(function () {
        return false;
    });
}


function setTextPopUpInfo(marker) {
    if (marker != userMarker) {
        var pixels = fromLatLngToPoint(marker.position);
        pixels.x += -$("#infoPopUp").width() * 0.52;
        pixels.y += -$("#infoPopUp").height() - 70;
        var houseRent = markers[marker.title].house;
        $("#infoPopUpProperyName").text(houseRent.propertyName);
        $("#infoPopUpProperyType").text(houseRent.propertyType);
        $("#infoPopUpAdress").text(houseRent.address);
        $("#infoPopUpPhoneNumber").text(houseRent.phoneNumber);
        $("#infoPopUpValue").text(houseRent.units + " units");
        openInfoPopUp(pixels);
    }
}

function tabInfoOver(elementId) {
    $("#" + elementId + "Btn").toggleClass("over");
}

function unselectAllTabs() {
    $(".tabInfo").removeClass("active");
    $(".tabContent").css("display", "none");
}

function showTabs(isUser) {
    $(".tabInfo").css("display", "none");
    if (isUser) {
        $("#streetViewTabBtn").css("display", "block");
        $("#weatherTabBtn").css("display", "block");
        $("#weatherTabBtn").css("display", "block");
    } else {
        $(".tabInfo").css("display", "block");
    }
}

function tabInfoClick(elementId) {
    unselectAllTabs();
    $("#" + elementId + "Btn").toggleClass("active");
    $("#" + elementId + "Content").css("display", "block");
    if (!openSide) {
        openSideBarR();
        if (markerSelected != userMarker) {
            translateCenter(markerSelected.position);
        }
    }
    switch (elementId) {
        case "streetViewTab":
            setTextPopUpInfo(markerSelected);
            setPanoramaMarker(markerSelected, true);
            break;
        case "weatherTab":
            setTextPopUpInfo(markerSelected);
            var position = {
                lat: markerSelected.position.lat.call(),
                lng: markerSelected.position.lng.call()
            };
            getWeatherByGeographicCoordinates(position.lat, position.lng);
            getWeatherByGeographicCoordinatesPreview(position.lat, position.lng);
            break;
        case "policeTab":
            setTextPopUpInfo(markerSelected);
            $("#policeDivInformation").remove();
            getPoliceStations();
            break;
        case "fireTab":
            setTextPopUpInfo(markerSelected);
            $("#fireDivInformation").remove();
            getFireStations();
            break;
        case "summaryTab":
            closeInfoPopUp(0.1);
            $("#policeDivInformation").remove();
            setSummary();
            break;
        case "clinicTab":
            setTextPopUpInfo(markerSelected);
            getClinics();
            break;
        case "parkTab":
            setTextPopUpInfo(markerSelected);
            getParks();
            break;
        case "foodTab":
            setTextPopUpInfo(markerSelected);
            getFood();
            break;
        case "schoolTab":
            setTextPopUpInfo(markerSelected);
            getPublicSchool();
            break;
        case "libraryTab":
            setTextPopUpInfo(markerSelected);
            getLibraries();
            break;
    }
}