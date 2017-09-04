var Layer = require('./Layer');

module.exports = class ANN{
	constructor(config){
		this.layers = [];
		for (var a=0;a<config.length;a++){
			this.layers.push(new Layer(config[a]));
			if (a>0){
				this.layers[a].connect(this.layers[a-1]);
			}
		}
	}
	fit(data){
		for (var a =0;a<data.length;a++){
			// console.log(a,data[a]);
			var {input,output} = data[a];
			this.predict(input); //NE GO TRII
			for(var b = 0;b<this.layers.length;b++){
				var currentLayer = this.layers[b];
				var tryingStates = currentLayer.try();
				var minimum = "kartof";
				for (var c = 0;c<tryingStates.length;c++){
					currentLayer.setState(tryingStates[c]);
					var result = this.test(input,output);
					if (minimum == "kartof" || result<minimum.result){
						// console.log("better:",result);
						minimum = {result,index:c};
					}
				}
				currentLayer.setState(tryingStates[minimum.index]);
				this.update();
			}
			this.update();
			// console.log("final:",this.test(input,output));
			// console.log("final:",this.test(input,output));
			// console.log("final:",this.test(input,output));
		}
		// console.log(totalError);
	}
	get inputLayer(){
		return this.layers[0];
	}
	get outputLayer(){
		return this.layers[this.layers.length-1];
	}
	test(input,output){
		var predicted = this.predict(input);
		var error = Math.abs(output - predicted);
		return error;
	}
	predict(input){
		this.inputLayer.pass.apply(this.inputLayer,input);
		this.update();
		return this.outputLayer.value;
	}
	update(){
		for (var a = 0; a < this.layers.length; a++) {
			this.layers[a].update();
		}	
	}
}
