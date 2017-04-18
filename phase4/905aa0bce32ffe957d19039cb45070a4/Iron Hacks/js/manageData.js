// JavaScript Document
var start = 2;
var maxDistance = 0;
var maxCrime = 0;

function c1(a, b){
	if(a[0].property_name < b[0].property_name) return -1;
	if(a[0].property_name > b[0].property_name) return 1;
	return 0;
}

function c2(a, b){
	if(a[0].management_company < b[0].management_company) return -1;
	if(a[0].management_company > b[0].management_company) return 1;
	return 0;	
}

function c3(a, b){
	if(a[2] > b[2]) return -1;
	if(a[2] < b[2]) return 1;
	return 0;	
}

function c4(a, b){
	if(a[4] < b[4]) return -1;
	if(a[4] > b[4]) return 1;
	return 0;	
}

function setText(){
	var txt = "<table border='1'>";
			$.each(completeData, function(i, elem){
				txt += "<tr>";
				
				txt += "<td class='text-left'>";
				txt += elem[0].property_name;
				txt += "</td>";

				txt += "<td class='text-left'>";
				txt += elem[0].address;
				txt += "</td>";

				txt += "<td class='text-left'>";
				txt += elem[0].management_company;
				txt += "</td>";

				txt += "<td class='text-left'>";
				txt += elem[0].phone_number;
				txt += "</td>";

				txt += "<td class='text-left'>";
				txt += (elem[2]/10000).toFixed(2) + " pts";
				txt += "</td>";

				txt += "<td class='text-left'>";
				txt += (elem[4]/1000).toFixed(2) + " KM";
				txt += "</td></tr>";
			});

			
			txt += "</table>";
			$('#dataTable').html(txt);	
	
			$("#dataTable tr").click(function(){
				new google.maps.event.trigger(completeData[$(this).index()][1], 'click');
				$(".anchorMap").trigger('click');
			});
}

$(document).ready(function(){
	
	var temp = setInterval(progressBar, geocoderSpeed);
	start = 2;
	function progressBar(){
		
		if(start >= 262){
			clearInterval(temp);
			
			$('.loadInfo').text("Done.");
			
			var txt = "<table border='1'>";
			$.each(completeData, function(i, elem){
				
				if(elem[4] > maxDistance)
					maxDistance = elem[4];
				
				if(elem[2] > maxCrime)
					maxCrime = elem[2];
				
				txt += "<tr>";
				
				txt += "<td class='text-left'>";
				txt += elem[0].property_name;
				txt += "</td>";

				txt += "<td class='text-left'>";
				txt += elem[0].address;
				txt += "</td>";

				txt += "<td class='text-left'>";
				txt += elem[0].management_company;
				txt += "</td>";

				txt += "<td class='text-left'>";
				txt += elem[0].phone_number;
				txt += "</td>";

				txt += "<td class='text-left'>";
				txt += (elem[2]/10000).toFixed(2) + " pts";
				txt += "</td>";

				txt += "<td class='text-left'>";
				txt += (elem[4]/1000).toFixed(2) + " KM";
				txt += "</td></tr>";
			});

			
			txt += "</table>";
			$('#dataTable').html(txt);
			
			
			$("#dataTable tr").click(function(){
				new google.maps.event.trigger(completeData[$(this).index()][1], 'click');
				$(".anchorMap").trigger('click');
				
			});
			

			
			$('select').change(function(){
					
				var dvalue = $('select[name=sorting]').val();
				if(dvalue == 1){
//					console.log("Selected value chaged", 1);
					completeData = completeData.sort(c1);
					setText();
				}else if(dvalue == 2){
					completeData = completeData.sort(c2);
					setText();
				}else if(dvalue == 3){
					completeData = completeData.sort(c3);
					setText();
				}else if(dvalue == 4){
					completeData = completeData.sort(c4);
					setText();
				}
				
			});
			
			;
			
		}else{
			
			
			$('.xprogress .sp').css("width", (start * 300 / 262) + "px");
			if((start * 100 / 262).toFixed(0) >= 11){
				$('.xprogress .sp').html("<p class=\"ptext\">" + (start * 100 / 262).toFixed(0) + "% </p>");
			
			}
			start++;
		}
			
	}
	
});

function hi(myCrime, myDistance){
	while(start < 261){
	}
	
	$('.dpcontent').css("visibility", "visible");
	
	
//	var crime = [myCrime];
//	d3.select('.sti')
//	.data(crime)
//		.style("width", function(d) { return d * 300 / maxCrime; } )
//	
//
//	var dist = [myDistance];
//	d3.select('.cri')
//	.data(dist)
//		.style("width", function(d) { return d * 300 / maxDistance; } )
	
	var calcDist = myDistance * 300 / 200000;
	if(calcDist > 300)
		calcDist = 300;
	
	var calcCrime = myCrime * 300 / (75 * 10000);
	if(calcCrime > 300)
		calcCrime = 300;
	
	$('.safety .yprogress .sp').css("width", calcCrime + "px");
	$('.distance .yprogress .sp').css("width", calcDist + "px");
}
