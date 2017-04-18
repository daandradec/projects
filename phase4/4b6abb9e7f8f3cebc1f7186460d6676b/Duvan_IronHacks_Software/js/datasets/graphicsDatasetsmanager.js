function initDataset(){
    getSizeCrimeDataset();
}
function getSizeDataset(index){
    if(index !== 6){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", urls[index], true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var myArr = xmlhttp.responseText;
                var json = JSON.parse(myArr);
                var size = json.data.length;
                data.push(size);
                switch(index){
                    case 0:
                        textData.push("Parks");
                        break;
                    case 1:
                        textData.push("Sport");
                        break;
                    case 2:
                        textData.push("Markets");
                        break;
                    case 3:
                        textData.push("Stores");
                        break;
                    case 4:
                        textData.push("Police St.");
                        break;
                    case 5:
                        textData.push("Fire St.");
                        break;
                }
                getSizeDataset(index+1);
            }
        }
    }else
        histogram();
}
function getSizeCrimeDataset(){
    $.ajax({
        url: "../zillowData/crime.txt",
        success: function (dataReturn) {
            var array = JSON.parse(dataReturn);
            var length = array.data.length;
            var crimeObject = [];
            for (var i = 0; i < length; ++i) {
                if (array.data[i][27] === null || array.data[i][28] === null)
                    continue;
                crimeObject.push(array.data[i]);
            }
            length = crimeObject.length;
            data.push(length);
            textData.push("Crime");
            getSizeDataset(0);
        }
    });
}

