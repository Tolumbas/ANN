module.exports = class Neuron{
	constructor(){
		this.inputs = [];
		this._value = 0;
		this.bias = 0;
	}
	get value(){
		return Math.tanh(this._value+this.bias);
	}
	set value(t){
		this._value = t;
		return this._value;
	}
	connect(n){
		if (n.constructor.name == "Neuron")
			this.inputs.push({neuron:n,weight:Math.random()*2-1});
		else
			this.inputs.push({value:n,weight:Math.random()*2-1});
	}
	pass(){
		for (var a=0;a<arguments.length;a++){
			if (!this.inputs[a]){
				// console.log("connect", arguments);
				this.connect(arguments[a]);
			}
			this.inputs[a].value = arguments[a];
		}
	}
	try(){
		const STEP = 0.001;
		var states = [];
		for (var a=0;a<this.inputs.length;a++){
			for (var b = -1;b<=1;b++){
				for (var c = -1;c<=1;c+=2){
					states.push({
						index:a,
						weight: this.inputs[a].weight + STEP*c,
						bias:this.bias + STEP*b
					});
				}
			}
		}
		return states;
	}
	setState(state){
		this.inputs[state.index].weight = state.weight;
		this.bias = state.bias;
	}
	update(){
		this._value = 0;
		for (var a of this.inputs){
			if (a.value)
				this._value+=a.value*a.weight;
			else
				this._value += a.neuron.value*a.weight;
		}
	}
}