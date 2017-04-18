function chart1 (){
var chart1 = c3.generate({
    title: {
        text: 'last 2000 Crimes commited:'
    },
    data: {
        // iris data from R
        columns: [
            ['Near from available Houses', crimecounter],
            ['Anywhere else', 2000-crimecounter],
        ],
        type : 'pie'
    }
});


}
function chart2 (){
    var dataC=[];
    for (var i in rentaldata){
        dataC.push([rentaldata[i][4].address ,rentaldata[i][6]]);
    }
    var chart2 = c3.generate({
        title: {
        text: 'From the total of the available houses:'
    },
        data: {
            // iris data from R
            columns: 
                dataC,
            type : 'pie'
        }
    });
}