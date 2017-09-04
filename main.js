var db = require('./database');
var ANN = require('./ANN');
// console.log(db.trainingData);



var data = db.trainingData;
var network = new ANN([1]);
for (var a=0;a<10;a++){
	network.fit(data);
}
var succesess = 0;
for (var a of db.testingData){
	succesess += Math.round(network.predict(a.input)) == a.output;
	console.log("predicted:",Math.round(network.predict(a.input)),"expected:",a.output);
}


console.log(succesess/db.testingData.length);
console.log(network.layers[0]);
console.log(network.layers[0].neurons[0].inputs);

