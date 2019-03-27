var bardata = [];
for (i=0; i<50; i++){
	bardata.push(Math.random() * 6);
}
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
var colors = d3.scale.linear()
	.domain([0, bardata.length * .33, bardata.length * .66, bardata.length])
	.range(['#fff','#1abc9c', '#2980b9', '#9b59b6', '#3498db']);

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
		.style('fill', function(d, i){return colors(i)})
		.attr({
			width: function(d) { return xScale.rangeBand()  } ,			
			height: function(d){ return yScale(d) } ,
			// return bar depending on data values
			x: function(d, i){ return xScale(d)},
			y: function(d) { return height - yScale(d) },
		})
;
