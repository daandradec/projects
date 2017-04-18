var date;
var dates = [];
function letCurrentDate(){
    date = new Date().toJSON().slice(0,10);
}
function getCurrentDateForClimateDataOnline(){
    date = getYesterday(new Date());
    date = getYesterday(date);
    date = getYesterday(date).toJSON().slice(0,10);
}
function getYesterday(today){
    return (new Date(today.getTime() - 24*60*60*1000));
}

function getYesterdayRecursive(dateInfo,index){
    if(index !== 10 ){
        var nDate = getYesterday(dateInfo);
        if(index > 2)
            dates.push([nDate,index-2]);
        getYesterdayRecursive(nDate,index+1);
    }
}
function getDaysWeek(){
    getYesterdayRecursive(new Date(),0);
    dates.reverse();
}
