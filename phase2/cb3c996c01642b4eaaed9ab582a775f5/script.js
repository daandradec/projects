window.initMap = function() {
    var el = document.getElementById('map');
    var google = window.google;

    // http://www.colourlovers.com/palette/937624/Dance_To_Forget
    var colors = ['#FF4E50','#FC913A','#F9D423','#EDE574','#E1F5C4','#FF4E50','#FC913A','#F9D423'];

    function SVGOverlay (map) {
        this.map = map;
        this.svg = null;
        this.coords = [];

        this.onPan = this.onPan.bind(this);

        this.setMap(map);
    }

    SVGOverlay.prototype = new google.maps.OverlayView();

    SVGOverlay.prototype.onAdd = function () {
        var width = el.clientWidth;
        var height = el.clientHeight;


        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.svg.style.position = 'absolute';
        this.svg.style.top = 0;
        this.svg.style.left = 0;
        this.svg.style.width = width;
        this.svg.style.height = height;
        this.svg.style.pointerEvents = 'none';

        var bounds = this.map.getBounds(),
        center = bounds.getCenter(),
        ne = bounds.getNorthEast(),
        sw = bounds.getSouthWest();
        for (var i = 0; i < 40; i++) {
            this.coords.push({
                id: i,
                color: colors[i % colors.length],
                latLng: new google.maps.LatLng(
                    center.lat() + (Math.random() - 0.5) * Math.abs(ne.lat() - sw.lat()),
                    center.lng() + (Math.random() - 0.5) * Math.abs(ne.lng() - sw.lng())
                )
            });
        }

        var proj = this.getProjection();

        // fill map with random points

        d3.select(this.svg)
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('class', 'coords')
        .selectAll('circle')
        .data(this.coords, (d) => d.id)
        .enter().append('circle')
        .attr('cx', (d) => proj.fromLatLngToContainerPixel(d.latLng).x)
        .attr('cy', (d) => proj.fromLatLngToContainerPixel(d.latLng).y)
        .attr('r', 5)
        .attr('fill', (d) => d.color);

        this.onPan();
        document.body.appendChild(this.svg);
        this.map.addListener('center_changed', this.onPan);
    };

    SVGOverlay.prototype.onPan = function () {
        var proj = this.getProjection();
        d3.select(this.svg)
        .select('.coords')
        .selectAll('circle')
        .data(this.coords)
        .attr('cx', (d) => proj.fromLatLngToContainerPixel(d.latLng).x)
        .attr('cy', (d) => proj.fromLatLngToContainerPixel(d.latLng).y);
    };

    SVGOverlay.prototype.onRemove = function () {
        this.map.removeListener('center_changed', this.onPan);
        this.svg.parentNode.removeChild(this.svg);
        this.svg = null;
    };

    SVGOverlay.prototype.draw = function () {
        console.log('draw');
    };

    var lat = 40.4266782;
    var lng = -86.9099169;

    getResults(lat, lng);

    var map = new google.maps.Map(el, {
        center: new google.maps.LatLng(lat, lng),
        zoom: 12,
        disableDefaultUI: true,
        backgroundColor: '#fff'
    });

    var overlay = new SVGOverlay(map);
};

var closestFarmersMarkets;

// get data from USDA National Farmers Market Directory API
function getResults(lat, lng) {
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        // submit get request to the restful service locSearch
        url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/locSearch?lat=" + lat + "&lng=" + lng,
        dataType: 'jsonp',
        jsonpCallback: 'searchResultsHandler'
    });
}

function searchResultsHandler(searchResults) {
    for(var key in searchResults) {
        var results = searchResults[key];
        for(var i = 0; i < results.length; i++) {
            // number in front of name is distance from you.
            var result = results[i];
            console.log(result);
        }

        var result = results[0];
        getFarmersMarketDetails(result.id);
    }
}

function getFarmersMarketDetails(id) {
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        // submit a get request to the restful service mktDetail.
        url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + id,
        dataType: 'jsonp',
        jsonpCallback: 'detailResultHandler'
    });
}

function detailResultHandler(detailResults) {
    for (var key in detailResults) {
        var results = detailResults[key];
        console.log(results);
    }
}
