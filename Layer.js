
var Neuron = require('./Neuron');

module.exports = class Layer{
	constructor(numberOfNeurons){
		this.neurons = [];
		for (var a =0;a<numberOfNeurons;a++){
			this.neurons.push(new Neuron());
		}
	}
	pass(){
		if (arguments.length != this.neurons.length){
			throw `ERROR: Unexpected input. 
			Expected ${this.neurons.length} inputs, got ${arguments.length}`;
		}
		for (var a =0; a<arguments.length;a++){
			try{
				var test = this.neurons[a].value = arguments[a];
			}
			catch(e){
				console.log(e,arguments);
			}
		}
		this.update();
		
	}
	get value(){
		if (this.neurons.length == 1){
			return this.neurons[0].value;
		}
		else{
			throw `ERROR: Layer has more than one neuron: ${this.neurons.length}`;
		}
	}
	connect(anotherLayer){
		for(var a=0;a<this.neurons.length;a++){
			for (var b=0;b<anotherLayer.neurons.length;b++){
				try{
					this.neurons[a].connect(anotherLayer.neurons[b]);
				}
				catch(e){
					console.log(e,'\n',this.neurons[a],'\n',anotherLayer.neurons[b]);
				}
			}
		}
	}
	update(){
		for (var a of this.neurons){
			a.update(true);
		}
	}
	expect(){

	}
}