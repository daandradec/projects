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
        $(".tabInfoSideBar").animate({
            right: "35%"
        }, 500);
        $(".map").animate({
            width: "65%"
        }, 500);
    }
}

function toogleSideBarL() {
    if (openSideL) {
        $("#btnCloseSidebarL").animate({
            left: "0%"
        }, 500);
        $("#searchSideBar").animate({
            width: "1px"
        }, 500);
        openSideL = true;
    } else {
        $("#btnCloseSidebarL").animate({
            left: "20%"
        }, 500);
        $("#searchSideBar").animate({
            width: "20%"
        }, 500);
        openSideL = false;
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
    $("#infoPopUp").offset({
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
    closeInfoPopUp(1);
    if (marker != userMarker) {
        var pixels = fromLatLngToPoint(marker.position);
        pixels.x += -$("#infoPopUp").width() * 0.52;
        pixels.y += -$("#infoPopUp").height() - 70;
        var houseRent = markers[marker.title].house;
        $("#infoPopUpProperyName").text(houseRent.propertyName);
        $("#infoPopUpProperyType").text(houseRent.propertyType);
        $("#infoPopUpAdress").text(houseRent.address);
        $("#infoPopUpPhoneNumber").text(houseRent.phoneNumber);
        $("#infoPopUpValue").text("$ " + houseRent.units);
        openInfoPopUp(pixels);
    }
}

function tabInfoOver(elementId) {
    $("#" + elementId + "Btn").toggleClass("over");
}

function unselectAllTabs() {
    $(".tabInfo").each(function (i, element) {
        $(element).removeClass("active");
    });
    $(".tabContent").each(function (i, element) {
        $(element).css("display", "none");
    });
}

function showTabs(isUser) {
    $(".tabInfo").each(function (i, element) {
        $(element).css("display", "none");
    });
    if (isUser) {
        $("#streetViewTabBtn").css("display", "block");
        $("#weatherTabBtn").css("display", "block");
        $("#weatherTabBtn").css("display", "block");
    } else {
        $(".tabInfo").each(function (i, element) {
            $(element).css("display", "block");
        });
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
            setTextPopUpInfo(markerSelected);
        }
    }
    switch (elementId) {
        case "streetViewTab":
            setPanoramaMarker(markerSelected, true);
            break;
        case "weatherTab":
            var position = {
                lat: markerSelected.position.lat.call(),
                lng: markerSelected.position.lng.call()
            };
            getWeatherByGeographicCoordinates(position.lat, position.lng);
            getWeatherByGeographicCoordinatesPreview(position.lat, position.lng);
            removeGraphWeather();
            break;
        case "policeTab":
            $("#policeDivInformation").remove();
            setPolice();
            break;
    }
}