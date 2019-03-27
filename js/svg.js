// draw rectangle
d3.select('#graph')
	.append('svg')
		.attr('width', 600)
		.attr('height', 400)
		.style('background', '#9b59b6')
	.append('rect')
		.attr({
			'x': 200,
			'y': 100,
			'height': 200,
			'width': 200,			
		})
		.style('fill', '#fff');


d3.select('#graph svg')
	.append('circle')
	.attr({
		'cx': 300,
		'cy': 200,
		'r': 50,
	})
	.style('fill', '#9b59b6' )