var bardata = [12, 60, 85, 15,23, 65, 70, 10, 19, 30, 80];
var height = 400,
	width = 900,
	barWidth = 100,
	barOffset = 5;

// use linear scale
var yScale = d3.scale.linear()
	.domain([0, d3.max(bardata)])
	.range([0, height]);

// use ordinal scale
var xScale = d3.scale.ordinal()
	.domain(bardata)
	.rangeBands([0, width], .1, .2);

// use d3 color scheme
var colors = d3.scale.category20c()
	.domain([0, bardata.length]);

console.log(colors);
// start d3 canvas
d3.select('#graph')
	.append('svg')
	.attr({
		'width': width,
		'height': height,

	})
	.style('background', '#2c3e50')
// start graph
.selectAll('rect')
	//get data
	.data(bardata)
	// start bars
	.enter().append('rect')
		.style('fill', function(d){return colors(d)})
		.attr({
			width: function(d) { return xScale.rangeBand()  } ,			
			height: function(d){ return yScale(d) } ,
			// return bar depending on data values
			x: function(d, i){ return xScale(d)},
			y: function(d) { return height - yScale(d) },
		})
;
