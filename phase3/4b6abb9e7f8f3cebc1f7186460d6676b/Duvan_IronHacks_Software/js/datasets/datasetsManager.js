function loadDataset(id,index){
    var xmlhttp = new XMLHttpRequest();
    var urls = ["https://data.cityofchicago.org/api/views/vcti-mbcd/rows.json?accessType=DOWNLOAD",
        "https://data.cityofchicago.org/api/views/eix4-gf83/rows.json?accessType=DOWNLOAD",
        "https://data.cityofchicago.org/api/views/ddxq-pdr6/rows.json?accessType=DOWNLOAD",
        "https://data.cityofchicago.org/api/views/wryv-d7zf/rows.json?accessType=DOWNLOAD",
        "https://data.cityofchicago.org/api/views/z8bn-74gv/rows.json?accessType=DOWNLOAD", 
        "https://data.cityofchicago.org/api/views/28km-gtjn/rows.json?accessType=DOWNLOAD"
    ];
    var checkIndexBox = document.getElementById(id).checked;
    if(checkIndexBox){
        xmlhttp.open("GET", urls[index], true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var myArr = xmlhttp.responseText;
                var json = JSON.parse(myArr);
                var size = json.data.length;
                var table=[];
                switch(index){
                    case 0:
                        for(var i = 0;i<size;++i){
                            var register = [];
                            register[0] = json.data[i][27];
                            register[1] = json.data[i][26];
                            register[2] = json.data[i][19];
                            register[3] = json.data[i][20];
                            table.push(register);
                        }
                        break;
                    case 1:
                        for(var i = 0;i<size;++i){
                            var register = [];
                            register[0] = json.data[i][15];
                            register[1] = json.data[i][14];
                            register[2] = json.data[i][12];
                            table.push(register);
                        }
                        break;
                    case 2:
                        for(var i = 0;i<size;++i){
                            var register = [];
                            register[0] = json.data[i][30][1];
                            register[1] = json.data[i][30][2];
                            register[2] = json.data[i][9];
                            register[3] = json.data[i][10];
                            table.push(register);
                        }
                        break;
                    case 3:
                        for(var i = 0;i<size;++i){
                            var register = [];
                            register[0] = json.data[i][14][1];
                            register[1] = json.data[i][14][2];
                            register[2] = json.data[i][10];
                            table.push(register);
                        }
                        break;
                    case 4:
                        for(var i = 0;i<size;++i){
                            var register = [];
                            register[0] = json.data[i][20];
                            register[1] = json.data[i][21];
                            register[2] = json.data[i][10];
                            table.push(register);
                        }
                        break;
                    case 5:
                        for(var i = 0;i<size;++i){
                            var register = [];
                            register[0] = json.data[i][14][1];
                            register[1] = json.data[i][14][2];
                            register[2] = json.data[i][9];
                            table.push(register);
                        }
                        break;
                }
                //for(var i = 0;i < table[0].length;++i)
                //    console.log(table[0][i]);
                if(markers[index].length===0)
                    updateMap(table,size,index);
                else
                    showMarkers(index);
            }
        };
    }else{
        if(markers[index].length===0)
            return;
        hideMarkers(index);
    }
}
