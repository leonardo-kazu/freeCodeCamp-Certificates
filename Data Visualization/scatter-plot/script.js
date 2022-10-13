async function getData (args) {
    let realData
    await $.get("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json", function (data) {
        realData = JSON.parse(data);

    });
    return realData;

}

$(document).ready(async function () {
    let dataset = await getData();
    let width = 800;
    let height = 450

    let tooltip = d3.select('#main')
                    .append('div')
                    .attr("id", "tooltip")
                    .style("opacity", 0)

    let svg = d3.select('#main')
                .append("svg")
                .attr("width", width + 160)
                .attr("height", height + 90);

    let tempos = dataset.map((d) => {
        let aux = d.Time.split(":")
        d.Time = new Date (1970, 0, 1,0,aux[0],aux[1])
        return  d.Time
    })

    let color = (doping) => {
        return doping ? "blue" : "red"
    }

    let xScale = d3.scaleLinear().range([0, width])

    let anos = dataset.map((d) => parseInt(d.Year))

    xScale.domain([d3.min(anos, (d) => d-1), d3.max(anos, (d) => d+1)])

    let yScale = d3.scaleTime().domain(d3.extent(tempos)).range([0, height])

    let yAxis = d3.axisLeft().scale(yScale).tickFormat(d3.timeFormat("%M:%S"))

    let xAxis = d3.axisBottom().scale(xScale).tickFormat((d3.format('d')))

    svg.append('g')
        .call(xAxis)
        .attr('id', "x-axis")
        .attr('transform', 'translate(80, 495)')

    svg.append('g')
        .call(yAxis)
        .attr("id", "y-axis")
        .attr("transform", 'translate(75, 45)')

    let timeformat = d3.timeFormat("%M:%S")

    svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append('circle')
        .attr('cx', (d) => xScale(parseInt(d.Year))+ 80)
        .attr('cy', (d) => yScale(d.Time)+ 45)
        .attr("r", 5)
        .attr("data-yvalue", (d) => d.Time.toISOString())
        .classed("dot", true)
        .attr('data-xvalue', (d) => d.Year)
        .style("fill", (d) => color(d.Doping === ""))
        .on("mouseover", (event, d) => {
            tooltip.transition().duration(200).style("opacity", 1)
            if (d.Doping !== "") {
                tooltip.html(d.Name + " " + d.Nationality
                            + "<br>Year: " + d.Year + " "
                            + "Time: " + timeformat(d.Time)
                            + "<br><br>" + d.Doping + "<br>"+ d.URL)
                        .style("left", event.layerX + 3 + "px")
                        .style("top", event.layerY + 3 + "px")
                        .attr('data-year', d.Year)
            } else {
                 tooltip.html(d.Name + " " + d.Nationality
                            + "<br>Year: " + d.Year + " "
                            + "Time: " + timeformat(d.Time))
                        .style("left", event.layerX + 3 + "px")
                        .style("top", event.layerY + 3 + "px")
                        .attr('data-year', d.Year)
           
            }
        })
        .on("mouseout", () => {
            tooltip.transition().duration(1000).style("opacity", 0)
        })

        let legend = svg.append('g').attr('id', 'legend')

        let container = legend.selectAll("#legend")
            .data([0, 1])
            .enter()
            .append('g')
            .classed('legend-label', true)

        container.selectAll('.legend-label')
            .data(["blue", "red"])
            .enter()
            .append('rect')
            .attr('x', width-18)
            .attr('y', (d,i) => height/2 + 45 - i*30)
            .attr('width', 18)
            .attr('height', 18)
            .style('fill', (d) => d)

        container.selectAll('.legend-label')
            .data([0,1])
            .enter()    
            .append('text')
            .attr('x', width - 24)
            .attr('y', (d, i) => height/2 + 55 - i*30)
            .attr('dy', '.35em')
            .style('text-anchor', 'end')
            .text((d) =>  {
                if (d) {
                return 'Riders with doping allegations';
                } else {
                return 'No doping allegations';
                }
            });









})