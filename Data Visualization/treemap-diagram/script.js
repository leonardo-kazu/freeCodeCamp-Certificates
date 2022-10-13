const DATASETS = {
    movies: {
        TITLE: 'Movie Sales',
        DESCRIPTION: 'Top 100 highest grossing movies grouped by Genre.',
        LINK: 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json'
    },
    videogames: {
        TITLE: 'Video Game Sales',
        DESCRIPTION: 'Top 100 most selled games grouped by Platform. (in Millions)',
        LINK: 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json'
    },
    kickstarter: {
        TITLE: 'Kickstarter Pledges',
        DESCRIPTION: 'Top 100 most pledged Kickstarter campaings grouped by Category',
        LINK: 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json'
    }
}

const colorbrewer = ['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a','#ffff99','#b15928']

let urlParam = new URLSearchParams(window.location.search);
const DEFAULT_DATASET = 'movies';
const DATASET = DATASETS[urlParam.get('dataset') || DEFAULT_DATASET]

$(document).ready(async () => {
    let dataset;

    $('#title').html(DATASET.TITLE)
    $('#description').html(DATASET.DESCRIPTION)

    await $.get(DATASET.LINK, (data) => {
        dataset = data;
    })

    const width = 1100;
    const height = 600;

    const tooltip = d3.select("#main")
                        .append('div')
                        .attr('id', 'tooltip')
                        .style('opacity', 0);

    const svg = d3.select('#main')
                    .append('svg')
                    .attr("width", width + 100)
                    .attr('height', height + 100)

    const root = d3.hierarchy(dataset)
                    .eachBefore((d) => {
                        d.data.id = (d.parent ? d.parent.data.id + '.' : "") + d.data.name
                    })
                    .sum(sumByValue)
                    .sort(function (a, b) {
                        return b.height - a.height || b.value - a.value;
                      });

    function sumByValue(d) {
        return d.value
    }

    let treemap = d3.treemap()
    treemap.paddingOuter(1)
            .size([width, height])
            .paddingInner(1)

    treemap(root);
    let categories = root.leaves().map((d) => d.data.category)
    categories = [...new Set(categories)]
    let color = d3.scaleOrdinal().domain(categories).range(['#1f77b4',
    '#aec7e8',
    '#ff7f0e',
    '#ffbb78',
    '#2ca02c',
    '#98df8a',
    '#d62728',
    '#ff9896',
    '#9467bd',
    '#c5b0d5',
    '#8c564b',
    '#c49c94',
    '#e377c2',
    '#f7b6d2',
    '#7f7f7f',
    '#c7c7c7',
    '#bcbd22',
    '#dbdb8d',
    '#17becf',
    '#9edae5']);


    let cell = svg.selectAll('g')
                    .data(root.leaves())
                    .enter()
                    .append('g')
                    .attr('transform', (d) => 'translate(' +(d.x0 + 50) + ',' + (d.y0 + 35)+')');

    cell.append('rect')
        .attr('id', (d) => d.data.id)
        .classed("tile", true)
        .attr('width', (d) => d.x1 - d.x0)
        .attr('height', (d) => d.y1 - d.y0)
        .style('fill', (d) => {
           return color(d.data.category)
        })
        .attr('data-name', (d) => d.data.name)
        .attr('data-category', (d) => d.data.category)
        .attr('data-value', (d) => d.data.value)
        .on('mousemove', (event, d) => {
            tooltip.transition().duration(200).style("opacity", 0.8)
            tooltip.attr('data-value', d.data.value)
                    .style('left', (event.pageX + 30)+ "px")
                    .style('top', (event.pageY -20) + "px")
                    .html(
                        d.data.name + '<br>' + d.data.category + '<br>' + d.data.value
                    )   
        })
        .on("mouseout", () => {
            tooltip.transition().duration(200).style("opacity", 0)
            tooltip.style('left', 0)
                    .style('top ', 0)
        })
    cell.append('text')
        .selectAll('tspan')
        .data((d) => d.data.name.split(' '))
        .enter()
        .append('tspan')
        .attr('x',3)
        .attr('y', (d,i) => 10 + 9*i)
        .text((d) => d)

    let legend = svg.append("g").attr('id', "legend")
    legend.selectAll("rect")
            .data(categories)
            .enter()
            .append('rect')
            .attr('x', (d,i) => 60 + 20*i)
            .attr('y', height + 70)
            .attr('width', 20)
            .attr('height', 20)
            .style('fill', (d) => color(d))
            .attr('class', 'legend-item')
    
})
