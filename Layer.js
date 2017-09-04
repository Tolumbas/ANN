
var Neuron = require('./Neuron');

module.exports = class Layer{
	constructor(numberOfNeurons){
		this.neurons = [];
		for (var a =0;a<numberOfNeurons;a++){
			this.neurons.push(new Neuron());
		}
	}
	pass(){
		for (var a =0; a<this.neurons.length;a++){
			this.neurons[a].pass(arguments[0]);
		}
	}
	get value(){
		if (this.neurons.length == 1){
			return this.neurons[0].value;
		}
		else{
			throw `ERROR: Layer has more than one neuron: ${this.neurons.length}`;
		}
	}
	get length(){
		return this.neurons.length;
	}
	try(){
		var states = [];
		for (var a =0;a<this.neurons.length;a++){
			var neuronStates = this.neurons[a].try();
			for (var b = 0;b<neuronStates.length;b++){
				var trying = {neuronState:neuronStates[b], index:a};
				states.push(trying);
			}
		}
		return states;
	}
	setState(state){
		this.neurons[state.index].setState(state.neuronState);
	}
	connect(anotherLayer){
		for(var a=0;a<this.neurons.length;a++){
			for (var b=0;b<anotherLayer.neurons.length;b++){
				this.neurons[a].connect(anotherLayer.neurons[b]);
			}
		}
	}
	update(){
		for (var a of this.neurons){
			a.update();
		}
	}
}