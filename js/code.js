var width = 900,
	height= 400,
	// define padding from the edge
	pad = 20,
	// define padding for the labels
	left_pad = 100;

// define horizontal scale, x
var x = d3.scale.ordinal().rangeRoundBands([left_pad, width - pad], 0.1);
// define scale, y
var y = d3.scale.linear().range([height-pad, pad]);

// define axis
var xAxis = d3.svg.axis().scale(x).orient("bottom");
var yAxis = d3.svg.axis().scale(y).orient("left");

// defining SVG element 
var svg = d3.select("#graph").append("svg")
				.attr("width", width)
				.attr("height", height);

d3.json('data/histogram-hours.json', function(data){
	// return data into a list of simple objects
	data = d3.keys(data).map(function (key){
		return {bucket: Number(key),
			N: data[key]};
	});

	// give the data a domain
		x.domain(data.map(function (d){ return d.bucket; }));
		y.domain([0, d3.max(data, function (d) { return d.N; })])

	// draw the axes on the graph to label it
	svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(0, "+ (height-pad) + ")")
		.call(xAxis);

	// draw the y axis
	svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(" + (left_pad-pad) + ", 0)")
		.call(yAxis);

	// draw some data
	svg.selectAll('rect')
		.data(data)
		.enter()
		.append('rect')
		.attr('class', 'bar')
		.attr('x', function (d) { return x(d.bucket); })
		.attr('width', x.rangeBand)
		.attr('y', height - pad)
		.transition()
		.delay(function (d) {return d.bucket*20; })
		.duration(800)
		.attr('y', function (d) { return y(d.N); })
		.attr('height', function (d) { return height-pad - y(d.N); });

});

/** style DOM elements using D3 **/

// style td elements
d3.selectAll('td').style('color', '#2980b9');

// bold table head
d3.selectAll('thead').selectAll('td').style('font-weight', 'bold');

// stye body cells in 2nd and 4th column
d3.selectAll('tbody tr').selectAll('td')
	.style('color', '#ffffff')
	.style('background-color', function (d, i){
		return i%2 ? '#2980b9' : '#2c3e50';
	});


/** Manipulate content using D3 */

// add new column to table
var newCol = d3.selectAll('tr').append('td');

// add text to newCol
newCol.text('a')

// add new text using array
newCol.text(function (d, i) {
	return ['Six', 'y', 'h', 'n'][i]
})


