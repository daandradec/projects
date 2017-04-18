

$(document).ready(function(){
    var vegs  =[]
    d3.csv("http://web.ics.purdue.edu/~nabraham/2017-Purdue-IronHack-NTAbraham/dev/Data/vegetables1.csv", function(data) {
    data.forEach(function(d) {
    vegs.push(d.Vegetables);
    });
    console.log(vegs);
    });

    var dropdown = document.getElementById('#dropdown');
    if (dropdown) 
    {
        for (var i=0; i < vegs.length;++i)
        {    
            addOption(dropdown, vegs[i], vegs[i]);
        }
    }
  });

    function addOption(selectbox, text, value) 
    {
    var optn = document.createElement("OPTION");
    optn.text = text;
    optn.value = value;
    selectbox.options.add(optn);  
    }
  

