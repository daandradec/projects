var datos = $.ajax({ url:"https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&stationid=GHCND:US1ILCK0094&startdate=2017-02-01&enddate=2017-03-01",
                    data: '',
                    headers:{ token:"nfkQDqLmwdwVKxmPoYIpdCJbCnSOohng" }});

//GHCND:US1ILDP0109
//GHCND:US1ILCK0094

datos.done(function(data){ $('#wet').text(data.results[0].datatype);
          console.log(data.results[0].datatype); });
