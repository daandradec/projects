function getJSONfromURL(url) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", url, true);
  xmlhttp.send();

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var myArr = xmlhttp.responseText;
      var text = myArr;
      return JSON.parse(text);
    }
    return null;
  }
}

console.log(getJSONfromURL("https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD").data[0][11]);

var xmlhttp = new XMLHttpRequest();
var url = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD"
xmlhttp.open("GET", url, true);
xmlhttp.send();
var washedData = [];

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = xmlhttp.responseText;
        var text = myArr;
        var json = JSON.parse(text);

        for (var i = 0; i<json.data.length; i++) {
            var dataLine = {
              name: json.data[i][11],
              address: json.data[i][12],
              phone: json.data[i][14],
              type: json.data[i][10],
              number: json.data[i][16],
              area: json.data[i][8],
              company: json.data[i][15],
              latitude: json.data[i][19],
              longitude: json.data[i][20],
              imageURL: 'https://maps.googleapis.com/maps/api/streetview?' +
                      'location=' + json.data[i][12] +
                      '&size=600x300' +
                      '&key=AIzaSyDip7CRroRr9Aui972KlJZ2MKr7P-U20PA',
              state: ''
            };
            washedData.push(dataLine);
        };

        var numberOfPlaces = washedData.length;
    }
};

Vue.component('data-item', {
  props: ['data'],
  template:
    `<div class="ui card" v-bind:class=data.state>
      <div class="ui image">
        <img v-bind:src=data.imageURL></img>
      </div>
      <div class="content">
        <div class="header">{{ data.name }}</div>
        <div class="meta">{{ data.company }}</div>
        <p>
          <b>Address: </b>{{ data.address }}<br>
          <b>Phone: </b>{{ data.phone }}<br>
          <b>Community Area: </b>{{ data.area }}
        </p>
      </div>
      <div class="ui bottom attached buttons">
        <div class="ui visit primary button" v-on:click="showVisitWindow(data)"><i class="marker icon"></i> Visit </div>
        <div class="ui view button" v-on:click="data.activateButton(data)">View <i class="right chevron icon"></i></div>
      </div>
    </div>`,
    methods: {
      showVisitWindow: function(dataItem) {
        modal.destination = dataItem.address;
        $('#modal').modal('show');
      }
    }
});

Vue.component('tt-prediction', {
  props: ['prediction'],
  template:
    `<div class="ui compact message">
      <div class="content">
        <div class="header">Travel time <i class="info circle icon" title="Aproximated travel time for the destination and date selected"></i></div>
        <div class="ui relaxed centered two column grid">
          <div class="column">
            <i class="large street view icon" title="Walking"></i> {{ walking }} <br>
            <i class="large bicycle icon" title="Bicycling"></i> {{ bicycling }} <br>
            <i class="large car icon" title="Driving"></i> {{ driving }} <br>
          </div>
          <div class="column">
            <i class="large bus icon" title="Bus"></i> {{ bus }} <br>
            <i class="large subway icon" title="Subway"></i> {{ subway }} <br>
            <i class="large train icon" title="Train"></i> {{ train }} <br>
          </div>
        </div>
      </div>
    </div>`,
    data: function() {
      return {
        walking: '40min',
        bicycling: '40min',
        driving: '40min',
        bus: '40min',
        subway: '40min',
        train: '40min'
      }
    },
    methods: {
      getTravelTime: function (origin, destination) {

      }
    }
});

var dataContainer = new Vue({
  el: '#data-container',
  data: {
    content: 'places',
    selectedPlace: '',
    placesList: washedData,
    buttonsList: [
      {
        name: 'places',
        state: 'active',
        text: 'Available Places',
        icon: 'home icon'
      },
      {
        name: 'details',
        state: '',
        text: 'Details',
        icon: 'bars icon'
      },
      {
        name: 'statistics',
        state: '',
        text: 'Statistics',
        icon: 'bar chart icon'
      }
    ]
  },
  methods: {
    activateButton: function (button) {
      for (var i = 0; i < this.buttonsList.length; i++) {
        if (this.buttonsList[i] === button) {
          this.buttonsList[i].state = 'active';
        } else {
          this.buttonsList[i].state = '';
        }
      }
      this.content = button.name;
    },
    activatePlace: function (place) {
      for (var i = 0; i < this.placesList.length; i++) {
        if (this.placesList[i] === place) {
          this.placesList[i].state = 'active';
        } else {
          this.placesList[i].state = '';
        }
        this.selectedPlace = place;
      }
    }
  }
});
