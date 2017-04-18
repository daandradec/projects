var url = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD";

$.get(url, function(data, status){
    console.log(status,data);

    for (var i = 0; i < 50; i++){

        console.log(data.data[i][19], data.data[i][20] );

        var latlng = new google.maps.LatLng(data.data[i][19], data.data[i][20]);

        addmarker(latlng);

        var temp = $(".panel-primary .card").clone();

        temp.find(".title").html( data.data[i][11] );

        temp.find(".content").append( "<p> hoi </p>" );
        
        $(".panel-group .myCardPanel").append(temp);
        
        console.log(temp) ;

    }
});

