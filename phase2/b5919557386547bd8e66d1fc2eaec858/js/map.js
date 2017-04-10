var map;
var greenRoofs = [];

function initMap() {
    var Emap = document.querySelector('#map');
    /*
    function SVGOverlay (map){
      this.map = map;
      this.svg = null;
      this.coords = [];
      this.onPan = this.onPan.bind(this);
      this.setMap(map);
    }
    SVGOverlay.prototype = new google.maps.OverlayView();

    SVGOverlay.prototype.onAdd = function () {
      this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      this.svg.style.position = 'absolute';
      this.svg.style.top = 0;
      this.svg.style.left = 0;
      this.svg.style.width = '960px';
      this.svg.style.height = '500px';
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

      d3.select(this.svg)
          .attr('width', 960)
          .attr('height', 500)
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
    };*/
    map = new google.maps.Map(Emap, {
        center: {
            lat: 41.870800,
            lng: -87.650500
        },
        zoom: 18,
        mapTypeId: 'satellite'
    });
    var marker = new google.maps.Marker({
        position: {
            lat: 41.870800,
            lng: -87.650500
        },
        map: map,
        title: 'Department of Computer Science – University of Illinois, Chicago',

    });
    var array
    var xmlhttp = new XMLHttpRequest();
    var url = "https://data.cityofchicago.org/resource/tnn6-5k2t.json";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = xmlhttp.responseText;
            var text = myArr;
            var json = JSON.parse(text);

            for (var i = 0; i < json.length; i++) {
                var obj = json[i];
                var marker = new google.maps.Marker({
                    position: {
                        lat: Number(obj["latitude"]),
                        lng: Number(obj["longitude"])
                    },
                    map: map,
                    title: obj["full_address"],
                    icon:'icons/greenRoof.png',
                });
                greenRoofs.push(marker);
            }
        }

    };
    //var overlay = new SVGOverlay(map);
};

function asign(a, b) {
    b = a;
};
/*
d3.request("https://data.cityofchicago.org/resource/tnn6-5k2t.json")
    .mimeType("application/json")
    .response(function(xhr) { return JSON.parse(xhr.responseText); })
    .get(greenRoofs);

function greenRoofs(greenJson){
  overlay = new google.maps.OverlayView();

  overlay.onadd = function(){
    var layer = d3.select(this.getPanes().overlayLayer).append("div")
        .attr("class", "greenr");
    overlay.draw = function () {
      var projection = this.getProjection(),
          padding = 10;
      var marker = layer.selectAll("svg")
          .data(d3.entries(greenJson))
          .each(transform) // update existing markers
        .enter().append("svg")
          .each(transform)
          .attr("class", "marker");

      // Add a circle.
      marker.append("circle")
          .attr("r", 4.5)
          .attr("cx", padding)
          .attr("cy", padding);

      // Add a label.
      marker.append("text")
          .attr("x", padding + 7)
          .attr("y", padding)
          .attr("dy", ".31em")
          .text(function(d) { return d.key; });

      function transform(d) {
        console.log(d.value[12]+" "+d.value[14]);
        d = new google.maps.LatLng(d.value[12], d.value[14]);
        d = projection.fromLatLngToDivPixel(d);
        return d3.select(this)
            .style("left", (d.x - padding) + "px")
            .style("top", (d.y - padding) + "px");
          }
    };
  };
  overlay.setMap(map);
};
*/
