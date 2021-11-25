// @TODO: YOUR CODE HERE!
//refer to 16.3(9) avctivity

// chart param
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// creat svg wrapper, append svg group that will hold the chart
//shift latter by left ad top margins 
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

  // Append an SVG group
var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);


// import data 
d3.csv("./assets/data/data.csv").then(function(alldata){
  console.log()
//and parse data 
    alldata.forEach(function(data){
    data.poverty= +data.poverty;
    data.healthcare=+data.healthcare;
});

//create scale function 
var xLinearScale = d3.scaleLinear()
.domain([8, d3.max(alldata, d => d.poverty)])
.range([0, width]);

var yLinearScale = d3.scaleLinear()
.domain([0, d3.max(alldata, d => d.healthcare)])
.range([height, 0]);

// create axis function
var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLeft(yLinearScale);

// append axes to the chart 
chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

chartGroup.append("g")
    .call(leftAxis);

// create circles 
var circlesGroup = chartGroup.selectAll("circle")
.data(alldata)
.enter()
.append("circle")
.attr("cx", d => xLinearScale(d.poverty))
.attr("cy", d => yLinearScale(d.healthcare))
.attr("r", "15")
.attr("fill", "pink")
.attr("opacity", ".5");

chartGroup.append('g').selectAll("text")
.data(alldata)
.enter()
.append("text")
.text(d => d.abbr)
.attr("x", d => xLinearScale(d.poverty))
.attr("y", d => yLinearScale(d.healthcare))
.attr("id", "circelabels")
.attr("dy", ".4em")
.attr("text-anchor", "middle")  

// //initial tool tip 
// var toolTip = d3.tip()
//     .attr("class", "tooltip")
//     .offset([80, 90])
//     .html(function (d) {
//       return (`${d.abbr}<br>Poverty: ${d.poverty} %<br>With healthcare: ${d.healthcare}%`);
//     })

// // adding tool tip to the chart 
// chartGroup.call(toolTip);

// // create event listeners to display tooltip
// circlesGroup.on("mouseover", function (data) {
//     toolTip.show(data, this);
//   })
//     // when removing mouse, remove/hide tooltip
//     .on("mouseout", function (data, index) {
//       toolTip.hide(data);
//     });


// Create axes labels
chartGroup.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 - margin.left + 40)
.attr("x", 0 - (height / 2))
.attr("dy", "1em")
.attr("class", "axisText")
.text("Lacks Healthcare (%)");

chartGroup.append("text")
.attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
.attr("class", "axisText")
.text("In Poverty (%)");
}).catch(function(error){
    console.log(error);
});