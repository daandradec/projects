var b = false;

function infoLibreria(nombre, direccion, horario, telefono){
  this.tipo = 'Libreria';
  this.name = nombre;
  this.direccion = direccion;
  this.horario = horario;
  this.telefono = telefono;
}

function drawLibraries(){
  var libra = [];
  var infoLibra = [];
		$.get("https://data.cityofchicago.org/api/views/x8fc-8rcq/rows.json?accessType=DOWNLOAD", function ( data ){
			librariesObjects = data.data;

      console.log(librariesObjects);
      for(var i = 0; i< librariesObjects.length;i++)
      {
        object = new objetcMarker(
          librariesObjects[i][18][1],librariesObjects[i][18][2],librariesObjects[i][8]);
        infoobject = new infoLibreria(
          librariesObjects[i][8],librariesObjects[i][12],librariesObjects[i][9],librariesObjects[i][16]
        );
        libra.push(object);
        infoLibra.push(infoobject);

      }

      var imprimir = '"<h2>" + infoMarkersList[i].tipo + " " + infoMarkersList[i].name + "</h2>" + "</br>" + "Direction: " + infoMarkersList[i].direccion + "</br>" + "Shedule: " + infoMarkersList[i].horario + "</br>" + "Phone: " + infoMarkersList[i].telefono';
      DrawMarkers(libra, "Images/library.png", infoLibra, imprimir);

		} , "json");
}
