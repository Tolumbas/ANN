function createPoint(diameter,offsetX,offsetY){
	var angle = Math.random()*2*Math.PI;
	var distance = Math.random()*diameter-diameter/2;
	return {
		x:offsetX+Math.cos(angle)*distance,
		y:offsetY+Math.sin(angle)*distance
	}
}

var trainingData = [];
var testingData = [];
for (var a =0;a<100;a++){
	var p1 = createPoint(5,-20,-20);
	p1.type= 1;
	var p2 = createPoint(5, 20, 20);
	p2.type= -1;
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