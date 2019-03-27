var bardata = [20, 30, 45, 15];
var height = 400,
	width = 600,
	barWidth = 20,
	barOffset = 5;

d3.select('#graph')
	.append('svg')
	.attr({
		'width': width,
		'height': height,

	})
	.style('background', '#2c3e50')
.selectAll('rect')
	.data(bardata)
	.enter().append('rect')
		.style('fill', '#2980b9')
		.attr({
			'width': barWidth,			
			height: function(d){ return d;},
			x: function(d, i){ return i *(barWidth + barOffset)},
			y: function(d) { return height - d},
		})
;