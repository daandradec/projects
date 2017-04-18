var map;
var departCenter;
var dataSets = 11;
var pastHouse = null;

function myMap( ) {

    departCenter = new google.maps.LatLng( 41.8708, -87.6505 );

    var mapOptions = {
        center: departCenter,
        zoom: 12,
        mapTypeId: 'roadmap'
    }

    map = new google.maps.Map( document.getElementById( "map" ), mapOptions );

    map.markers = new Array( );
    map.indexes = new Array( );
    map.flags = new Array( );

    //markers data
    for ( var i = 0; i < dataSets; i++ ) {
        map.markers.push( new Array( ) );
        map.indexes.push( new Array( ) );
        map.flags.push( false );
    }

    map.getMarkers = function( ) {
        return this.markers
    };

    var icon = {
        url: 'assets/icon.png',
        scaledSize: new google.maps.Size( 30, 30 ),
    };

    var w = new google.maps.Marker({
        position: departCenter,
        map: map,
        icon: icon,
        title: 'Department of Computer Science – University of Illinois'
    });

    var houseIcon = {
        url: 'assets/house-icon.png',
        scaledSize: new google.maps.Size( 20, 20 )
    };
    
    var houseChoosenIcon = {
        url: 'assets/houseChoosen.png',
        scaledSize: new google.maps.Size( 20, 20 )
    };

    map.addMarker = function( position, distance, name, visible, listener, icon, pos ) {
    
        var marker = new google.maps.Marker({
            position: position,
            map: this,
            icon: icon,
            title: name,
            dist: distance
        });

        marker.setVisible( visible );
        this.markers[ pos ].push( marker );
        if ( listener ) {
            google.maps.event.addListener( marker, 'click', function( ) {
            
                document.getElementById( "houseName" ).innerHTML = name;
                document.getElementById( "distance" ).innerHTML = calcDistance( departCenter, position ) + " km";
            
                if ( pastHouse != null )
                    pastHouse.setIcon( houseIcon );
                
                pastHouse = marker;
                marker.setIcon( houseChoosenIcon );

                for ( var m = 1; m < dataSets; m++ ) {
                    for ( var i = 0; i < map.indexes[ m ].length; i++ )
                        map.markers[ m ][ map.indexes[ m ][ i ] ].setVisible( false );

                    map.indexes[ m ] = new Array( );
                    var cnt = 0;
                    for ( var i = 0; i < map.markers[ m ].length; i++ )
                    {
                        if ( calcDistance( marker.position, map.markers[ m ][ i ].position ) < map.markers[ m ][ i ].dist )
                        {
                            map.indexes[ m ].push( i );
                            cnt++;
                        }
                    }
                        
                    document.getElementById( "data" + m ).innerHTML = cnt;

                    if ( map.flags[ m ] )
                        for ( var i = 0; i < map.indexes[ m ].length; i++ )
                            map.markers[ m ][ map.indexes[ m ][ i ] ].setVisible( true );
                }

                map.setCenter( position );
            });
        }
    };

    map.hideMarkers = function( pos ) {
        for ( var i = 0; i < this.markers[ pos ].length; i++ )
            this.markers[ pos ][ i ].setVisible( false );
    };

    map.showMarkers = function( pos ) {
        for ( var i = 0; i < this.markers[ pos ].length; i++ )
            this.markers[ pos ][ i ].setVisible( true );
    };

	google.maps.event.addDomListener( window, "resize", function( ) {
   		var center = map.getCenter( );
   		google.maps.event.trigger( map, "resize" );
   		map.setCenter( center );
	});

	fillRentHouses( );
	fillParks( );
	fillPoliceStations( );
	fillFireStations( );
	fillLibraries( );
	fillBikeRacks( );
	fillWarmCenters( );
	fillCondomDistributionCenters( );
	fillCoolingCenters( );
	fillHospitals( );
	fillGrocery( );
	getWeather( );
	//getCrimes( );
}

function toggleMarkers( index )
{
    map.flags[ index ] = !map.flags[ index ];
    for ( var i = 0; i < map.indexes[ index ].length; i++ ) {
        if ( map.markers[ index ][ map.indexes[ index ][ i ] ].getVisible( ) ) {
            map.markers[ index ][ map.indexes[ index ][ i ] ].setVisible( false );
        }
        else {
            map.markers[ index ][ map.indexes[ index ][ i ] ].setVisible( true );
        }
    }
}

function fillParks( ) {

    var xmlhttp = new XMLHttpRequest( );
    var url = "https://data.cityofchicago.org/api/views/pxyq-qhyd/rows.json?accessType=DOWNLOAD";
    xmlhttp.open( "GET", url, true );
    xmlhttp.send( );

    xmlhttp.onreadystatechange = function( ) {
        if ( xmlhttp.readyState == 4 && xmlhttp.status == 200 ) {
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse( text );

            washedData = new Array( );
            for ( var i = 0; i < json.data.length; i++ ) {
                var dataLine = [];
                //latitude - 0
                dataLine.push( json.data[ i ][ 13 ] );
                //longitude - 1
                dataLine.push( json.data[ i ][ 12 ] );
                //name - 2
                dataLine.push( json.data[ i ][ 8 ] );

                washedData.push( dataLine );
            };

            var icon = {
                url: 'assets/tree-icon.png',
                scaledSize: new google.maps.Size( 20, 20 )
	        };
            for ( var i = 0; i < washedData.length; i++ ) {
            	var loc = new google.maps.LatLng( washedData[ i ][ 0 ], washedData[ i ][ 1 ] );
                map.addMarker( loc, 1.5, washedData[ i ][ 2 ], false, false, icon, 1 );
        	}
    	}
    }
}

function fillRentHouses( ) {

    var xmlhttp = new XMLHttpRequest( );
    var url = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD";
    xmlhttp.open( "GET", url, true );
    xmlhttp.send( );

    xmlhttp.onreadystatechange = function( ) {
        if ( xmlhttp.readyState == 4 && xmlhttp.status == 200 ) {
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse( text );

            washedData = new Array( );
            for ( var i = 0; i < json.data.length; i++ ) {
                var dataLine = [];
                //latitude - 0
                dataLine.push( json.data[ i ][ 19 ] );
                //longitude - 1
                dataLine.push( json.data[ i ][ 20 ] );
                //name - 2
                dataLine.push( json.data[ i ][ 11 ] );

                washedData.push( dataLine );
            };

            var icon = {
                url: 'assets/house-icon.png',
                scaledSize: new google.maps.Size( 20, 20 )
            };
            for ( var i = 0; i < washedData.length; i++ ) {
            	var loc = new google.maps.LatLng( washedData[ i ][ 0 ], washedData[ i ][ 1 ] );
           	    map.addMarker( loc, 0, washedData[ i ][ 2 ], true, true, icon, 0 );
        	}
    	}
    }
}

function fillPoliceStations( ) {

    var xmlhttp = new XMLHttpRequest( );
    var url = "https://data.cityofchicago.org/api/views/z8bn-74gv/rows.json?accessType=DOWNLOAD";
    xmlhttp.open( "GET", url, true );
    xmlhttp.send( );

    xmlhttp.onreadystatechange = function( ) {
        if ( xmlhttp.readyState == 4 && xmlhttp.status == 200 ) {
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse( text );

            washedData = new Array( );
            for ( var i = 0; i < json.data.length; i++ ) {
                var dataLine = [];
                //latitude - 0
                dataLine.push( json.data[ i ][ 20 ] );
                //longitude - 1
                dataLine.push( json.data[ i ][ 21 ] );
                //name - 2
                dataLine.push( json.data[ i ][ 9 ] );

                washedData.push( dataLine );
            };

            var icon = {
                url: 'assets/police.png',
                scaledSize: new google.maps.Size( 30, 30 )
            };
            for ( var i = 0; i < washedData.length; i++ ) {
            	var loc = new google.maps.LatLng( washedData[ i ][ 0 ], washedData[ i ][ 1 ] );
           	    map.addMarker( loc, 2, washedData[ i ][ 2 ], false, false, icon, 2 );
        	}
    	}
    }
}

function fillFireStations( ) {

    var xmlhttp = new XMLHttpRequest( );
    var url = "https://data.cityofchicago.org/api/views/28km-gtjn/rows.json?accessType=DOWNLOAD";
    xmlhttp.open( "GET", url, true );
    xmlhttp.send( );

    xmlhttp.onreadystatechange = function( ) {
        if ( xmlhttp.readyState == 4 && xmlhttp.status == 200 ) {
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse( text );

            washedData = new Array( );
            for ( var i = 0; i < json.data.length; i++ ) {
                var dataLine = [];
                //latitude - 0
                dataLine.push( json.data[ i ][ 14 ][ 1 ] );
                //longitude - 1
                dataLine.push( json.data[ i ][ 14 ][ 2 ] );
                //name - 2
                dataLine.push( json.data[ i ][ 9 ] );

                washedData.push( dataLine );
            };

            var icon = {
                url: 'assets/fire.png',
                scaledSize: new google.maps.Size( 40, 40 )
            };
            for ( var i = 0; i < washedData.length; i++ ) {
            	var loc = new google.maps.LatLng( washedData[ i ][ 0 ], washedData[ i ][ 1 ] );
           	    map.addMarker( loc, 2, washedData[ i ][ 2 ], false, false, icon, 3 );
        	}
    	}
    }
}

function fillLibraries( ) {

    var xmlhttp = new XMLHttpRequest( );
    var url = "https://data.cityofchicago.org/api/views/x8fc-8rcq/rows.json?accessType=DOWNLOAD";
    xmlhttp.open( "GET", url, true );
    xmlhttp.send( );

    xmlhttp.onreadystatechange = function( ) {
        if ( xmlhttp.readyState == 4 && xmlhttp.status == 200 ) {
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse( text );

            washedData = new Array( );
            for ( var i = 0; i < json.data.length; i++ ) {
                var dataLine = [];
                //latitude - 0
                dataLine.push( json.data[ i ][ 18 ][ 1 ] );
                //longitude - 1
                dataLine.push( json.data[ i ][ 18 ][ 2 ] );
                //name - 2
                dataLine.push( json.data[ i ][ 8 ] );

                washedData.push( dataLine );
            };

            var icon = {
                url: 'assets/library.png',
                scaledSize: new google.maps.Size( 30, 30 )
            };

            for ( var i = 0; i < washedData.length; i++ ) {
            	var loc = new google.maps.LatLng( washedData[ i ][ 0 ], washedData[ i ][ 1 ] );
           	    map.addMarker( loc, 2, washedData[ i ][ 2 ], false, false, icon, 4 );
        	}
    	}
    }
}

function fillBikeRacks( ) {

    var xmlhttp = new XMLHttpRequest( );
    var url = "https://data.cityofchicago.org/api/views/cbyb-69xx/rows.json?accessType=DOWNLOAD";
    xmlhttp.open( "GET", url, true );
    xmlhttp.send( );

    xmlhttp.onreadystatechange = function( ) {
        if ( xmlhttp.readyState == 4 && xmlhttp.status == 200 ) {
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse( text );

            washedData = new Array( );
            for ( var i = 0; i < json.data.length; i++ ) {
                var dataLine = [];
                //latitude - 0
                dataLine.push( json.data[ i ][ 14 ] );
                //longitude - 1
                dataLine.push( json.data[ i ][ 15 ] );

                washedData.push( dataLine );
            };


            var icon = {
                url: 'assets/bikeRack.png',
                scaledSize: new google.maps.Size( 30, 30 )
            };
            for ( var i = 0; i < washedData.length; i++ ) {
            	var loc = new google.maps.LatLng( washedData[ i ][ 0 ], washedData[ i ][ 1 ] );
           	    map.addMarker( loc, 0.5, "Rack", false, false, icon, 5 );
        	}
    	}
    }
}

function getCrimes( ) {

    var xmlhttp = new XMLHttpRequest( );
    var url = "https://data.cityofchicago.org/api/views/ijzp-q8t2/rows.json?accessType=DOWNLOAD";
    xmlhttp.open( "GET", url, true );
    xmlhttp.send( );

    xmlhttp.onreadystatechange = function( ) {
        if ( xmlhttp.readyState == 4 && xmlhttp.status == 200 ) {
        
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse( text );
            
            console.log( json.data.length );

            washedData = new Array( );
            for ( var i = 0; i < json.data.length; i++ ) {
                var dataLine = [];
                //latitude - 0
                dataLine.push( json.data[ i ][ 18 ][ 1 ] );
                //longitude - 1
                dataLine.push( json.data[ i ][ 18 ][ 2 ] );
                //name - 2
                dataLine.push( json.data[ i ][ 8 ] );

                washedData.push( dataLine );
            };


            var icon = {
                url: 'assets/bikeRack.png',
                scaledSize: new google.maps.Size( 30, 30 )
            };
            for ( var i = 0; i < washedData.length; i++ ) {
            	var loc = new google.maps.LatLng( washedData[ i ][ 0 ], washedData[ i ][ 1 ] );
           	    map.addMarker( loc, 0.5, "Rack", false, false, icon, 5 );
        	}
    	}
    }
}

function fillWarmCenters( ) {

    var xmlhttp = new XMLHttpRequest( );
    var url = "https://data.cityofchicago.org/api/views/h243-v2q5/rows.json?accessType=DOWNLOAD";
    xmlhttp.open( "GET", url, true );
    xmlhttp.send( );

    xmlhttp.onreadystatechange = function( ) {
        if ( xmlhttp.readyState == 4 && xmlhttp.status == 200 ) {
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse( text );

            washedData = new Array( );
            for ( var i = 0; i < json.data.length; i++ ) {
                var dataLine = [];
                //latitude - 0
                dataLine.push( json.data[ i ][ 31 ][ 1 ] );
                //longitude - 1
                dataLine.push( json.data[ i ][ 31 ][ 2 ] );
                //name - 2
                dataLine.push( json.data[ i ][ 8 ] );

                washedData.push( dataLine );
            };

            var icon = {
                url: 'assets/warm.png',
                scaledSize: new google.maps.Size( 30, 30 )
            };

            for ( var i = 0; i < washedData.length; i++ ) {
            	var loc = new google.maps.LatLng( washedData[ i ][ 0 ], washedData[ i ][ 1 ] );
           	    map.addMarker( loc, 2, washedData[ i ][ 2 ], false, false, icon, 6 );
        	}
    	}
    }
}

function fillCondomDistributionCenters( ) {

    var xmlhttp = new XMLHttpRequest( );
    var url = "https://data.cityofchicago.org/api/views/azpf-uc4s/rows.json?accessType=DOWNLOAD";
    xmlhttp.open( "GET", url, true );
    xmlhttp.send( );

    xmlhttp.onreadystatechange = function( ) {
        if ( xmlhttp.readyState == 4 && xmlhttp.status == 200 ) {
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse( text );

            washedData = new Array( );
            for ( var i = 0; i < json.data.length; i++ ) {
                var dataLine = [];
                //latitude - 0
                dataLine.push( json.data[ i ][ 14 ][ 1 ] );
                //longitude - 1
                dataLine.push( json.data[ i ][ 14 ][ 2 ] );
                //name - 2
                dataLine.push( json.data[ i ][ 9 ] );

                washedData.push( dataLine );
            };

            var icon = {
                url: 'assets/cond.png',
                scaledSize: new google.maps.Size( 30, 30 )
            };

            for ( var i = 0; i < washedData.length; i++ ) {
            	var loc = new google.maps.LatLng( washedData[ i ][ 0 ], washedData[ i ][ 1 ] );
           	    map.addMarker( loc, 2, washedData[ i ][ 2 ], false, false, icon, 7 );
        	}
    	}
    }
}

function fillCoolingCenters( ) {

    var xmlhttp = new XMLHttpRequest( );
    var url = "https://data.cityofchicago.org/api/views/msrk-w9ih/rows.json?accessType=DOWNLOAD";
    xmlhttp.open( "GET", url, true );
    xmlhttp.send( );

    xmlhttp.onreadystatechange = function( ) {
        if ( xmlhttp.readyState == 4 && xmlhttp.status == 200 ) {
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse( text );

            washedData = new Array( );
            for ( var i = 0; i < json.data.length; i++ ) {
                var dataLine = [];
                //latitude - 0
                dataLine.push( json.data[ i ][ 16 ][ 1 ] );
                //longitude - 1
                dataLine.push( json.data[ i ][ 16 ][ 2 ] );
                //name - 2
                dataLine.push( json.data[ i ][ 8 ] );

                washedData.push( dataLine );
            };

            var icon = {
                url: 'assets/cool.png',
                scaledSize: new google.maps.Size( 30, 30 )
            };

            for ( var i = 0; i < washedData.length; i++ ) {
            	var loc = new google.maps.LatLng( washedData[ i ][ 0 ], washedData[ i ][ 1 ] );
           	    map.addMarker( loc, 2, washedData[ i ][ 2 ], false, false, icon, 8 );
        	}
    	}
    }
}

function fillHospitals( ) {

    var xmlhttp = new XMLHttpRequest( );
    var url = "https://data.cityofchicago.org/api/views/kcki-hnch/rows.json?accessType=DOWNLOAD";
    xmlhttp.open( "GET", url, true );
    xmlhttp.send( );

    xmlhttp.onreadystatechange = function( ) {
        if ( xmlhttp.readyState == 4 && xmlhttp.status == 200 ) {
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse( text );

            washedData = new Array( );
            for ( var i = 0; i < json.data.length; i++ ) {
                var dataLine = [];
                //latitude - 0
                dataLine.push( json.data[ i ][ 27 ] );
                //longitude - 1
                dataLine.push( json.data[ i ][ 28 ] );
                //name - 2
                dataLine.push( json.data[ i ][ 9 ] );

                washedData.push( dataLine );
            };

            var icon = {
                url: 'assets/hospital.ico',
                scaledSize: new google.maps.Size( 30, 30 )
            };

            for ( var i = 0; i < washedData.length; i++ ) {
            	var loc = new google.maps.LatLng( washedData[ i ][ 0 ], washedData[ i ][ 1 ] );
           	    map.addMarker( loc, 5, washedData[ i ][ 2 ], false, false, icon, 9 );
        	}
    	}
    }
}

function fillGrocery( ) {

    var xmlhttp = new XMLHttpRequest( );
    var url = "https://data.cityofchicago.org/api/views/wryv-d7zf/rows.json?accessType=DOWNLOAD";
    xmlhttp.open( "GET", url, true );
    xmlhttp.send( );

    xmlhttp.onreadystatechange = function( ) {
        if ( xmlhttp.readyState == 4 && xmlhttp.status == 200 ) {
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse( text );

            washedData = new Array( );
            for ( var i = 0; i < json.data.length; i++ ) {
                var dataLine = [];
                //latitude - 0
                dataLine.push( json.data[ i ][ 14 ][ 1 ] );
                //longitude - 1
                dataLine.push( json.data[ i ][ 14 ][ 2 ] );
                //name - 2
                dataLine.push( json.data[ i ][ 8 ] );

                washedData.push( dataLine );
            };

            var icon = {
                url: 'assets/groc.png',
                scaledSize: new google.maps.Size( 30, 30 )
            };

            for ( var i = 0; i < washedData.length; i++ ) {
            	var loc = new google.maps.LatLng( washedData[ i ][ 0 ], washedData[ i ][ 1 ] );
           	    map.addMarker( loc, 8, washedData[ i ][ 2 ], false, false, icon, 10 );
        	}
    	}
    }
}

function getWeather( ) {

    var xmlhttp = new XMLHttpRequest( );
    var url = "http://api.openweathermap.org/data/2.5/weather?q=chicago&appid=6aa0bdb1f586c5630d60b6237dfce45c";
    xmlhttp.open( "GET", url, true );
    xmlhttp.send( );
    xmlhttp.onreadystatechange = function( ) {
        if ( xmlhttp.readyState == 4 && xmlhttp.status == 200 ) {
            var myArr = xmlhttp.responseText;
            var text = myArr;
            
            json = JSON.parse( text );
            
            document.getElementById( "weather" )
                .innerHTML = "Today the weather is <em><b>" + json.weather[ 0 ].main + "</b></em>";
        }
    };
}

function calcDistance( p1, p2 ) {
    return ( google.maps.geometry.spherical.computeDistanceBetween( p1, p2 ) / 1000 ).toFixed( 2 );
}

function sleep( ms ) {
    return new Promise( resolve => setTimeout( resolve, ms ) );
}
