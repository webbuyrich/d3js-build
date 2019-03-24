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
		
	Data = data.filter( function (d) { 
				return d['Doctor actor'] != 'Matt Smith';
			});
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

	// sort data
	tbody.selectAll('tr')
		.sort(function (a,b){
			return d3.ascending(
				a['Doc. no.'],
				b['Doc. no.']
			);
		});
};