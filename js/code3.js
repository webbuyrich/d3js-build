var svg = d3.select('#graph')
	.append('svg')
	.style('width', 1024)
	.style('height', 768);

// draw text
svg.append('text')
	.text('A picture')
	.attr({
		x: 10,
		y: 150,
		'text-anchor':'start'
});

// draw a line
svg.append('line')
	.attr({
		y1: 10,
		x2: 100,
		y2: 100,
		stroke: '#e74c3c',
		'stroke-width': 3
	});

// draw a rectangle
svg.append('rect')
	.attr({
		x: 200,
		y: 50,
		width: 300,
		height: 400,
		fill: '#fff',
		stroke: '#2ecc71',
		'stroke-width': 0.5,
		rx: 20,
		ry: 40
});

// draw a circle
svg.append('circle')
	.attr({
		cx: 350,
		cy: 250,
		r: 100,		
		fill: '#2ecc71',
		'fill-opacity': 0.5,
		stroke: '#2ecc71',
		'stroke-width': 2,
});