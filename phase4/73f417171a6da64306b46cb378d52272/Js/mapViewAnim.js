
var MAX_RANGE = 20;
var START_RANGE = 0;

$(function  () {
  $("ol.simple-drop").sortable();
  $("#criteriaTypes").sortable("disable");
});


function addCriteria(type){

    var item = $('#' + type);

    item.hide('fast',function(){
      $('#criteriaSelection').append(item);
      item.show('fast');
    
      item.find('.fa-times').show();
      item.find('.fa-arrows').show();
      item.find('.fa-plus').hide();
  });
}

function removeCriteria(type){

    var item = $('#' + type);
    
    item.hide('fast',function(){

      $('#criteriaTypes').append(item);
      item.show('fast');
    
      item.find('.fa-times').hide();
      item.find('.fa-arrows').hide();
      item.find('.fa-plus').show(); 
  });
}


function calcRange(){
  return ((MAX_RANGE * document.getElementById('rangeDistance').value)/(100));
}

function printRange(){
  var mk = calcRange();

  MainMap.drawRadioHouses(parseInt(mk));
}



function showHouses(){
  $('#mapContainer').animate({
        'right':'25%',

  });
  $('#housesContainer').animate({
        'width':'25%',
        'padding-left':'-25%'
  });

}

var ComponentsAction = (function(){

  return {

    viewCheckboxToggle: function(componentId,view){
          var comp = document.getElementById(componentId);



          comp.onchange = function(){
              if(comp.checked){
                view.toggleVisibilityMarker(true);
                }else{
                    view.toggleVisibilityMarker(false);
              }
          }  
    },

    viewCheckboxIniState : function(componentId,view){
         var comp = document.getElementById(componentId);

              if(comp.checked){
                view.toggleVisibilityMarker(true);

                }else{
                    view.toggleVisibilityMarker(false);
              }
    },

    radioMapDraw : function(map){
        //var comp = document.getElementById('rangeDistance');
      $("#rangeDistance").on("input", function(){

          var km = calcRange();

          $('#rangeContainer p').text(km + " Km");

          map.drawOverMap(parseInt(km));

         map.showCurrentMarkers(parseInt(km));
        
      });
    },

    getFiltersOrder : function(){
        var components = $('#criteriaSelection li');
        
        var max = components.length;
        var outputArray = [];

        for(var i=0;i<max;i++){
            outputArray[i] = components.get(i).innerText;
        }
      
        return outputArray;
    },

    updateNavigator : function(){

      if(calcRange()==0){
        alert("Select Radio Distance");
        return;
      }
      var component = $('#paginationList');
      var selection = ComponentsAction.getFiltersOrder();
      var buffer;

      component.empty();

      for(var i=0;i<selection.length;i++){
      
        buffer = component.append("<li><a>" + selection[i] + "</a></li>");

        document.getElementById('paginationList').lastChild.childNodes[0].onclick = function(){
          ComponentsAction.updateHouses(this.innerText);
        }

      } 
    },

    updateHousesContainer : function(){
        
    },


    updateHouses : function(input){
    

      OrderData.sortUserSelection(input);
    

      var houses = OrderData.getHousesData();
      var dataBuffer;
      var max = $('#list-houses div.media').length;

  


      for(var i=0;i<max;i++){
          dataBuffer = houses[OrderData.getCurrentHouses()[i].index];

       


          $('#list-houses div.media a div.media-body p')[i].innerHTML = dataBuffer.com_name;
          $('#list-houses div.media a div.media-body h4')[i].innerText = dataBuffer.address.replace(/\+/g,' ');
          $('#list-houses div.media a div.media-left img')[i].src = "../Resources/Icons/filledHouse.jpg";
      }
    },

    showModalWindow : function(index){
      
        if(calcRange()==0){
        alert("Select Radio Distance");
        $('#houseDataModal').modal('show');
        return;
      }
        

        if(OrderData.getCurrentHouses().length!=0){

            if(OrderData.getCurrentHouses().length!=0){
                var houses = OrderData.getHousesData();

                $('#modalAddress').text(" " + houses[OrderData.getCurrentHouses()[index].index].address.replace(/\+/g,' '));
                $('#modalNeighborhood').text(" " + houses[OrderData.getCurrentHouses()[index].index].com_name);
                $('#modalPrice').text(" $" + houses[OrderData.getCurrentHouses()[index].index].rent);
                $('#modalDistance').text(" " + houses[OrderData.getCurrentHouses()[index].index].distance + " Km to the University.");
                

                $('#modalLocate').on("click",function(){
                    var km = calcRange();
                    MainMap.showCurrentMarkers(parseInt(km));
                    OrderData.getCurrentMarkers()[index].marker.setIcon("../Resources/Icons/apartmentSelected.png");
                    OrderData.getCurrentMarkers()[index].marker.setZIndex(1000);
                })
            }
        }
        
    },

    showClickDataHouses : function(index){

          if(sessionStorage.length == 0){
              console.log("<error>: the session data was not loaded |showClickDataHouses|");
              return;
          }

          //alert(index);
        
          var houses = JSON.parse(sessionStorage.array);
          
          $('#modalAddress').text(" " + houses[index].address.replace(/\+/g,' '));
          $('#modalNeighborhood').text(" " + houses[index].com_name);
          $('#modalPrice').text(" $" + houses[index].rent);
          $('#modalDistance').text(" " + houses[index].distance + " Km to the University.");
          

          $('#modalLocate').on("click",function(){
              var km = calcRange();

              MainMap.showCurrentMarkers(parseInt(km));
              OrderData.getCurrentMarkers()[index].marker.setIcon("../Resources/Icons/apartmentSelected.png");
              OrderData.getCurrentMarkers()[index].marker.setZIndex(1000);
          });

          
    },
    addLoader : function(){
      
      $('footerButton').append('<i class="fa fa-spinner faa-spin animated faa-slow" aria-hidden="true" style = "font-size:40px"></i>');
    },
    removeLoader : function(){
       $('footerButton').empty();
       $('footerButton').append('<button class = "btn btn-default btn-block" onclick = "ComponentsAction.updateNavigator()"> Get Houses</button>');
    }

  }
})();

/* Animation of list components */

/* INITIALIZER COMPONENTS */

$('#criteriaTypes li .fa-arrows').css('display','none');
$('#criteriaTypes li .fa-times').css('display','none');
$('#criteriaSelection li .fa-plus').css('display','none');

document.getElementById('rangeDistance').value = START_RANGE;

$(':checkbox').checkboxpicker();







