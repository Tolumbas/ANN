var db = require('./database');
// console.log(db.trainingData);
var Layer = require('./Layer');


var input = new Layer(2);
var output = new Layer(1);
input.connect(output);
input.pass(0,1);
console.log(output.value);
output.expect(1);




