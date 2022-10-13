
async function getData (args) {
    let realData
    
    await $.get("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json", function (data) {
        data = JSON.parse(data);
        realData = data.data;
    });
    return realData;

}



$(document).ready(async function () {

    let dataset =  await getData();
    let width = 800;
    let height = 450;
    let barWidth = width/275

    let tooltip = d3.select('#main')
                    .append('div')
                    .attr("id", "tooltip")
                    .style("opacity", 0)
    let svg = d3.select("#main")
                .classed("svg-container", true)
                .attr("preserveAspectRatio", "xMinYMin meet")
                .attr("viewBox", "0 0 1900 900")
                .classed("svg-content-responsive", true)
                .append("svg")
                .attr("width", width + 160)
                .attr("height", height + 90);


    let dados = dataset.map((d) => d[1])
    let time = dataset.map((d) => new Date(d[0]))
    let nTime = dataset.map((d) => d[0])


    const xScale = d3.scaleLinear().domain([0, 275]).range([0, width])

    const xScaleAxis = d3.scaleTime().domain([d3.min(time), d3.max(time)]).range([0, width])

    let xAxis = d3.axisBottom().scale(xScaleAxis);

    svg.append('g')
      .call(xAxis)
      .attr('id', 'x-axis')
      .attr('transform', 'translate(80, 500)');


    const yScale = d3.scaleLinear().domain([0, d3.max(dados)]).range([0, height])

    const yScaleAxis = d3.scaleLinear().domain([0, d3.max(dados)]).range([height, 0])

    let yAxis = d3.axisLeft().scale(yScaleAxis);

    svg.append('g')
      .call(yAxis)
      .attr('id', 'y-axis')
      .attr('transform', 'translate(75, 45)')

    svg.selectAll("rect")
       .data(dados)
       .enter()
       .append("rect")
       .attr("x", (d, i) => xScale(i)+80)
       .attr('y', (d) => height + 45 - yScale(d))
       .attr("width", barWidth)
       .attr("height", (d, i) => yScale(d))
       .attr('class',"bar")
       .style('fill', "skyblue")
       .attr('index', (d, i) => i)
       .attr("data-gdp", (d, i) => d)
       .attr('data-date', (d, i) => nTime[i])
       .on("mouseover", (event, d) => {
            let date  = event.originalTarget.dataset.date
            tooltip.transition().duration(200).style("opacity", 0.8)
            tooltip.html(date + "<br>" + "$" + d + " Billion")
                   .attr('data-date', date)
                   .style('left', '90px')
                   .style('top', '45px')
                   .style('transform', 'translate(60px, 100px)');
       })
       .on('mouseout', () => {
        tooltip.transition().duration(1000).style('opacity', 0)
       })


});