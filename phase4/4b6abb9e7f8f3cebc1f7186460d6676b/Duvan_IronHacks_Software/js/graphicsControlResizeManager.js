function update(){
    projectionr.scale((((width/2)+(height/2))/3)-30)
            .translate([width / 2, height / 2]);

    pathr = d3.geo.path()
        .projection(projectionr);

    graticule = d3.geo.graticule();

    svg.attr("width", width)
        .attr("height", height);


    circle.attr("cx", width / 2)
        .attr("cy", height / 2)
        .attr("r",(((width/2)+(height/2))/3)-30);

    radius = (((width/2)+(height/2))/3)-30,
        scale = radius;

    projection.translate([width / 2, height / 2])
        .scale(scale);

    canvas.attr("width", width)
        .attr("height", height);
    if(canvasHisto !== undefined){
        canvasHisto.attr("width", width).attr("height", height);

        line.attr("x1", 30).attr("y1", height - 17)
                .attr("x2", width - 5).attr("y2", height - 17)

        heightScale.domain([getMax(data), 0])
                .range([height - 50, 0]);

        yRange.domain([0, getMax(data)]).range([height - 30, 0]);

        canvasHisto.selectAll("rect").attr("width", (width / 25))
                .attr("height", function (d) {
                    return heightScale(d)
                })
                .attr("fill", function (d) {
                    return color(d);
                })
                .attr("y", function (d) {
                    return (height - 18) - heightScale(d)
                })
                .attr("x", function (d, i) {
                    return i * (width / 25) + (i + 1) * (width / 10)
                });

        group.attr("transform", "translate(40,10)").attr("stroke", "black").attr("stroke-width", 0.5)
                .call(yAxis);
        
        hd1.style("top",(height*2.25)-(heightScale(data[0]))+"px")
            .style("left",(width/10)-(width/70)+"px");
        hd2.style("top",(height*2.25)-(heightScale(data[1]))+"px")
            .style("left",(width/25) + 2*(width/10)-(width/70)+"px");
        hd3.style("top",(height*2.28)-(heightScale(data[2]))+"px")
            .style("left",2*(width/25) + 3*(width/10)-(width/70)+"px");
        hd4.style("top",(height*2.25)-(heightScale(data[3]))+"px")
            .style("left",3*(width/25) + 4*(width/10)-(width/70)+"px");
        hd5.style("top",(height*2.25)-(heightScale(data[4]))+"px")
            .style("left",4*(width/25) + 5*(width/10)-(width/70)+"px");
        hd6.style("top",(height*2.25)-(heightScale(data[5]))+"px")
            .style("left",5*(width/25) + 6*(width/10)-(width/70)+"px");
        hd7.style("top",(height*2.25)-(heightScale(data[6]))+"px")
            .style("left",6*(width/25) + 7*(width/10)-(width/70)+"px");
        var fSize = ((1.0/105.0)*(width-300))+12;
        fSize = Math.floor(fSize);
        document.getElementById("headerOne").style.fontSize = fSize+"pt";
        document.getElementById("headerTwo").style.fontSize = fSize+"pt";
        document.getElementById("headerThree").style.fontSize = fSize+"pt";
        document.getElementById("headerFour").style.fontSize = fSize+"pt";
        document.getElementById("headerFive").style.fontSize = fSize+"pt";
        document.getElementById("headerSix").style.fontSize = fSize+"pt";
        document.getElementById("headerSeven").style.fontSize = fSize+"pt";
    }
    var firstFontSize = ((8.0/525.0)*(width-300))+10;
    firstFontSize = Math.floor(firstFontSize);
    document.getElementById("header1").style.fontSize = firstFontSize+"pt";
}

