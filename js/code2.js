// global variable
var Data;

// append empty table to graph div
var table = d3.select('#graph')
	.append('table')
	.attr('class', 'table');

var thead = table.append('thead'),
	tbody = table.append('tbody');



// Load data and assign it to the Data variable
var reload = function () {
	d3.csv('data/villians.csv', function (data){
		Data = data;
		redraw();
	});
};
reload();

// Draw the table
var redraw = function (){
	// select all table rows and join data
	var tr = tbody.selectAll('tr')
		.data(Data);

	// create a table row for every new datum in the dataset
	tr.enter()
		.append('tr');

	// remove any tr element once data is changed
	tr.exit()
		.remove();

	tr.selectAll('td')
		.data(function (d) { return d3.values(d); })
		.enter()
		.append('td')
		.text(function (d) { return d });
};