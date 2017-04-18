var urls = ["https://data.cityofchicago.org/api/views/vcti-mbcd/rows.json?accessType=DOWNLOAD",
        "https://data.cityofchicago.org/api/views/eix4-gf83/rows.json?accessType=DOWNLOAD",
        "https://data.cityofchicago.org/api/views/ddxq-pdr6/rows.json?accessType=DOWNLOAD",
        "https://data.cityofchicago.org/api/views/wryv-d7zf/rows.json?accessType=DOWNLOAD",
        "https://data.cityofchicago.org/api/views/z8bn-74gv/rows.json?accessType=DOWNLOAD", 
        "https://data.cityofchicago.org/api/views/28km-gtjn/rows.json?accessType=DOWNLOAD"
    ];
var data = [],textData = [];
var canvasHisto,heightScale,color,yRange,yAxis,bars,group,line,text;
var hd1,hd2,hd3,hd4,hd5,hd6,hd7;