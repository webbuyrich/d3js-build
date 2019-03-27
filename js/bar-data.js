var bardata = [12, 60, 45, 15];
var height = 400,
	width = 600,
	barWidth = 100,
	barOffset = 5;

// use linear scale
var yScale = d3.scale.linear()
	.domain([0, d3.max(bardata)])
	.range([0, height]);

	
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
		.style('fill', '#2980b9')
		.attr({
			'width': barWidth,			
			height: function(d){ return yScale(d) } ,
			// return bar depending on data values
			x: function(d, i){ return i *(barWidth + barOffset)},
			y: function(d) { return height - yScale(d) },
		})
;
