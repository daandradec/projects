function histogram(){
    canvasHisto = d3.select("body").append("svg")
        .attr("width",width).attr("height",height).attr("id","svg2");
    heightScale = d3.scaleLinear()
            .domain([getMax(data),0])
            .range([height-50,0]);
    color = d3.scaleLinear()
            .domain([0,getMax(data)])
            .range(["red","blue"]);

    yRange = d3.scaleLinear()
        .domain([0,getMax(data)]).range([height-30,0]);
    yAxis = d3.axisLeft(yRange).ticks(40);

    bars = canvasHisto.selectAll("rect")
            .data(data)
            .enter()
                .append("rect")
                .attr("width",(width/25))
                .attr("height",function(d){return heightScale(d)})
                .attr("fill",function(d){return color(d);})
                .attr("y",function(d){return (height-18)-heightScale(d)})
                .attr("x",function(d,i){return i*(width/25) + (i+1)*(width/10)});

    group = canvasHisto.append("g").attr("transform","translate(40,10)").attr("stroke","black").attr("stroke-width",0.5)
            .call(yAxis);
    line = canvasHisto.append("line")
                .attr("x1",30).attr("y1",height-17)
                .attr("x2",width-30).attr("y2",height-17)
                .attr("stroke","black").attr("stroke-width",3);
        
    var fSize = ((1.0/105.0)*(width-300))+12;
        fSize = Math.floor(fSize);
        
    hd1 = d3.select("body").append("h2").attr("id","headerOne").text(textData[0])
            .style("top",(height*2.25)-(heightScale(data[0]))+"px")
            .style("left",(width/10)-(width/70)+"px").style("font-size",fSize+"px");
    hd2 = d3.select("body").append("h2").attr("id","headerTwo").text(textData[1])
            .style("top",(height*2.25)-(heightScale(data[1]))+"px")
            .style("left",(width/25) + 2*(width/10)-(width/70)+"px").style("font-size",fSize+"px");
    hd3 = d3.select("body").append("h2").attr("id","headerThree").text(textData[2])
            .style("top",(height*2.28)-(heightScale(data[2]))+"px")
            .style("left",2*(width/25) + 3*(width/10)-(width/70)+"px").style("font-size",fSize+"px");
    hd4 = d3.select("body").append("h2").attr("id","headerFour").text(textData[3])
            .style("top",(height*2.25)-(heightScale(data[3]))+"px")
            .style("left",3*(width/25) + 4*(width/10)-(width/70)+"px").style("font-size",fSize+"px");
    hd5 = d3.select("body").append("h2").attr("id","headerFive").text(textData[4])
            .style("top",(height*2.25)-(heightScale(data[4]))+"px")
            .style("left",4*(width/25) + 5*(width/10)-(width/70)+"px").style("font-size",fSize+"px");
    hd6 = d3.select("body").append("h2").attr("id","headerSix").text(textData[5])
            .style("top",(height*2.25)-(heightScale(data[5]))+"px")
            .style("left",5*(width/25) + 6*(width/10)-(width/70)+"px").style("font-size",fSize+"px");
    hd7 = d3.select("body").append("h2").attr("id","headerSeven").text(textData[6])
            .style("top",(height*2.25)-(heightScale(data[6]))+"px")
            .style("left",6*(width/25) + 7*(width/10)-(width/70)+"px").style("font-size",fSize+"px");
}
