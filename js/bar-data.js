// read data file - json import
d3.json('data/forecast.json', function(d){

	var temperatures = [],
		height = 400,
		width = 900,
		barWidth = 100,
		barOffset = 5;
		
	// no value variables
	var tempColor,
		yScale,
		xScale,
		colors,
		tooltip,
		myChart;


	// loop through data file
	for (i=0; i< d.list.length; i++){
		temperatures.push(d.list[i].main.temp);
	}

	// use linear scale
	yScale = d3.scale.linear()
		.domain([0, d3.max(temperatures)])
		.range([0, height]);

	// use ordinal scale
	xScale = d3.scale.ordinal()
		.domain(temperatures)
		.rangeBands([0, width], .1, .2);

	// use d3 color scheme
	colors = d3.scale.linear()
		.domain([0,  65, 75, d3.max(temperatures)])
		.range(['#fff','#2980b9','#f39c12', '#e74c3c']);


	// create a tooltip
	tooltip = d3.select('body')
		.append('div')
		.style({
			'position':'absolute',
			'padding': '0 10px',
			'background': '#fff',
			'opacity': '0.5'
		})


	// start d3 canvas
	myChart = 
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
			.data(temperatures)
			// start bars
			.enter().append('rect')
				.style('fill', colors)
				.attr({
					width: function(d) { return xScale.rangeBand()  } ,			
					'height': 0 ,
					// return bar depending on data values
					x: function(d, i){ return xScale(d)},
					'y': height
				})

			// add opacity on mouseover
			.on('mouseover', function(d){
				// tooltip transition
				tooltip.transition().duration(200)
					.style('opacity', 0.9)

				// add tooltip 
				tooltip.html(d)
					.style({
						'left': (d3.event.pageX - 35) + 'px',
						'top': (d3.event.pageY - 130) + 'px'
					})
				tempColor = this.style.fill;
				d3.select(this)
					.style({
						'fill': '#e67e22'
					})
			})	
			// remove opacity on mouseout
			.on('mouseout', function(d){
				d3.select(this)
					.style({
						'fill': tempColor
					})
			});

	myChart.transition()
		.attr({
			height: function(d){ return yScale(d) } ,
			y: function(d) { return height - yScale(d) },
		})
		.delay(function(d,i){
			return i * 50;
		})
		.duration(1000)


});




