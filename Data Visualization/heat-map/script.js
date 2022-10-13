$(document).ready(async () => {

    let dataset;

    let colorbrewer = [
        '#a50026',
        '#d73027',
        '#f46d43',
        '#fdae61',
        '#fee090',
        '#ffffbf',
        '#e0f3f8',
        '#abd9e9',
        '#74add1',
        '#4575b4',
        '#313695'
      ]

    await $.get("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json", function (data) {
        data = JSON.parse(data);
        dataset = data;
    });
    let data = dataset.monthlyVariance
    let temps = data.map((d) => (dataset.baseTemperature + d.variance).toFixed(1));
    let years = data.map((d) => d.year);
    let width = 1300;
    let height = 500;
    let barWidth = width/(temps.length/12);
    let barHeight = height/12;
    

    let tooltip = d3.select('#main')
                    .append('div')
                    .attr("id", "tooltip")
                    .style('opacity', 0);

    let svg = d3.select('#main')
                .append('svg')
                .attr("width", width + 120)
                .attr('height', height + 125)

    const xScale = d3.scaleBand().domain(years)
                                .range([0, width]);

    const yScale = d3.scaleBand().domain([1,2,3,4,5,6,7,8,9,10,11,12]).range([0, height])

    const xAxis = d3.axisBottom()
                    .scale(xScale)
                    .tickValues(xScale.domain().filter((year) => year % 10 === 0))

    const yAxis = d3.axisLeft()
                    .scale(yScale)
                    .tickValues(yScale.domain())
                    .tickFormat((month) => {
                        let date = new Date(0)
                        date.setUTCMonth(month)
                        let format = d3.timeFormat("%B")
                        return format(date)
                    });


    svg.append('g')
        .call(xAxis)
        .attr('id', 'x-axis')
        .attr('transform','translate(60, 525)');

    svg.append('g')
        .call(yAxis)
        .attr('id', 'y-axis')
        .attr('transform', 'translate(60, 25)');

        console.log(d3.extent(temps))
        
    let myColor = d3.scaleThreshold().domain([2.8,3.9,5.0,6.1,7.2,8.3,9.5,10.6,11.7,12.8]).range(colorbrewer.reverse())

    svg.selectAll("rect")
        .data(data)
        .enter()
        .append('rect')
        .classed("cell", true)
        .attr('x', (d) => xScale(d.year)+ 60)
        .attr('y', (d) => yScale(d.month) + 25)
        .attr('width', barWidth)
        .attr('height', barHeight)
        .style('fill', (d,i) => {
            return myColor(temps[i])
        })
        .attr('data-month', (d) => d.month-1)
        .attr('data-year', (d) => d.year)
        .attr('data-temp', (d,i) => temps[i])
        .attr("temp", (d, i) => temps[i])
        .on('mouseover', (event, d, i) => {
            let date = new Date(0)
            date.setUTCMonth(d.month)
            let format = d3.timeFormat("%B")
            tooltip.transition().duration(200).style("opacity", 0.8)
            tooltip.html(d.year + ' - ' + format(date)
            + "<br>" +(dataset.baseTemperature + d.variance).toFixed(1) + "<br>" 
            + "Variância "+ d.variance)
            .style("left", event.layerX - 50 + "px")
            .style("top", event.layerY - 100 + "px")
            tooltip.attr("data-year", d.year)
        })
        .on('mouseout', () => {
            tooltip.transition().duration(1000).style('opacity', 0)
        })

    let legend = svg.append('g').attr("id", 'legend')
    
    let legendWidth = 25 * 10
    
    let legendX = d3.scaleBand().domain([2.8,3.9,5.0,6.1,7.2,8.3,9.5,10.6,11.7,12.8]).range([0, legendWidth])
    
    let legendXAxis = d3.axisBottom().scale(legendX).tickValues([2.8,3.9,5.0,6.1,7.2,8.3,9.5,10.6,11.7,12.8]).ticks(11, '.1f')
    
    legend.selectAll('rect')
            .data([2.8,3.9,5.0,6.1,7.2,8.3,9.5,10.6,11.7,12.8])
            .enter()
            .append('rect')
            .attr('x', (d, i) => legendX(d)+60)
            .attr('y', height + 60)
            .attr('height', 20)
            .attr('width', 25)
            .style('fill', (d) => myColor(d))
            .style('stroke', "black")
        
    legend.append("g")
        .call(legendXAxis)
        .attr("transform","translate(60,580)")
        
        
        
    })