$(document).ready(async () => {
    let datasetone;
    let datasettwo;

    const colorbrewer = ['#edf8e9','#c7e9c0','#a1d99b','#74c476','#41ab5d','#238b45','#005a32']

    await $.get("https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json", (data) => {
        datasetone = data;
    })

    await $.get("https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json", (data) => {
        datasettwo = data;

})
    console.log(datasetone);
    console.log(datasettwo);

    const width = 800;
    const height = 530;

    const tooltip = d3.select('#main')
                      	.append('div')
                      	.attr('id', 'tooltip')
                      	.style('opacity', 0)

    const svg = d3.select('#main')
    .append('svg')
    .attr("width", width + 160)
    .attr('height', height + 69);

    const path = d3.geoPath();

    const values = datasetone.map((d) => d.bachelorsOrHigher);
    console.log(d3.extent(values));

    const myColor = d3.scaleQuantize().domain(d3.extent(values)).range(colorbrewer);


    const legend = svg.append("g").attr("id","legend");
    const legendWidth = 250;

    const legendScale = d3.scaleLinear().domain(d3.extent(values)).rangeRound([0, legendWidth])
    const legendAxis = d3.axisBottom(legendScale).tickSize(10).tickValues([2.6,13,23.5,34,44.5,54.5,65,75]).tickFormat((d) => Math.round(d) + "%");

    legend.selectAll("rect")
    .data(myColor.range())
    .enter()
    .append('rect')
    .attr('x', (d,i) => 250/7*i+600)
    .attr('y', 50 )
    .attr('width', 250/7)
    .attr('height', 10)
    .style('fill', (d) => d);

    legend.append('g')
        .call(legendAxis)
        .attr('transform',"translate(600,50)")
        .select(".domain")
        .remove();

    svg.append('g')
        .attr('class', 'counties')
        .selectAll('path')
        .data(topojson.feature(datasettwo, datasettwo.objects.counties).features)
        .enter()
        .append('path')
        .attr('class', 'county')
        .attr('d', path)
        .style("fill", (d) => {
          	const result = datasetone.filter((i) => i.fips === d.id)
          // console.log(result[0])
          	return myColor(result[0].bachelorsOrHigher)
        })
        .attr("data-fips", (d) => {
          	return datasetone.filter((i) => i.fips === d.id)[0].fips
        })
        .attr("data-education", (d) => {
          	return datasetone.filter((i) => i.fips === d.id)[0].bachelorsOrHigher
        })
        .on("mouseover", (event, d) => {
          	tooltip.transition().duration(200).style("opacity", 0.8)
          	tooltip.attr("data-education", () => {
            	return datasetone.filter((i) => i.fips === d.id)[0].bachelorsOrHigher})
                  	.style("left", event.layerX + "px")
                  	.style("top", event.layerY - 50 + "px")
                  	.html(() => {
                    	const result = datasetone.filter((i) => i.fips === d.id)
                    	return (
                      		result[0]['area_name'] + " - " + result[0]['state'] + "<br>" + result[0].bachelorsOrHigher+"%"
                    	)
                  	})
        })
        .on("mouseout", () => {
          	tooltip.transition().duration(1000).style("opacity", 0)
        });

    svg.append('path')
        .datum(
          	topojson.mesh(datasettwo, datasettwo.objects.states, (a, b) => a !== b)
        )
        .attr('class', 'states')
        .attr('d', path);

    svg.append('path')
    	.datum(
        	topojson.mesh(datasettwo, datasettwo.objects.nation)
        )
        .attr('class', 'states')
        .attr('d', path);
		
});