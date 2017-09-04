function createPoint(diameter,offsetX,offsetY){
	var angle = Math.random()*2*Math.PI;
	var distance = Math.random()*diameter-diameter/2;
	return [
		offsetX+Math.cos(angle)*distance,
		offsetY+Math.sin(angle)*distance
	]
}

var trainingData = [];
var testingData = [];
for (var a =0;a<1000;a++){
	var p1 = {},p2 = {};
	p1.input = createPoint(30,-10,-10);
	p1.output = 1;
	p2.input = createPoint(30, 10, 10);
	p2.output = -1;
	if (a<20){
		trainingData.push(p1);
		trainingData.push(p2);
	}
	else{
		testingData.push(p1);
		testingData.push(p2);
	}
}
exports.trainingData = trainingData;
exports.testingData = testingData;