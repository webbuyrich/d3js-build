// read data file - json import
d3.json('data/forecast.json', function(d){

	var temperatures = [],
		height = 400,
		width = 900;
		
	// no value variables
	var tempColor,
		yScale,
		yAxisValues,
		yAxisTicks,
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

	// create yAxis values
	yAxisValues = d3.scale.linear()
		.domain([0, d3.max(temperatures)])
		// reverse height to draw scale correctly
		.range([height, 0]);

	// create yAxis tick marks
	yAxisTicks = d3.svg.axis()
		.scale(yAxisValues)
		//define how many ticks
		.ticks(10)
		// define which side to display
		.orient('left');

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
			// start to group the elements
			.append('g')			
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

					// add tooltip text
					tooltip.html(
						'<div style="font-size: 2rem; font-weight:bold">'+ d + '&deg;</div>'
					)
						.style({
							'left': (d3.event.pageX - 35) + 'px',
							'top': (d3.event.pageY - 30) + 'px'
						})
					tempColor = this.style.fill;
					d3.select(this)
						.style({
							'fill': '#e67e22'
						})
				})	
				// remove opacity on mouseout
				.on('mouseout', function(d){
					// set tooltip to empty once you mouseout
					tooltip.html('')
					d3.select(this)
						.style({
							'fill': tempColor
						})
				});

	// create the y ticks 
	yGuide = d3.select('#graph svg').append('g')
			.attr('transform', 'translate(20,0)')
			.call(yAxisTicks)

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




