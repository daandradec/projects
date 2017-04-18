function getMax(data){
    var length = data.length;
    var max = 0;
    for(var i = 0;i < length;++i){
        if(data[i] > max)
            max = data[i];
    }
    return max;
}
