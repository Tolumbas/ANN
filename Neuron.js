module.exports = class Neuron{
	constructor(){
		this.outputs =[];
		this.inputs = [];
		this._value = Math.random();
		this.bias = 0;
		this.mute = false;
	}
	get value(){
		return this._value;
	}
	set value(t){
		var temp = parseFloat(t);
		if (isNaN(temp)){throw `ERROR t is NaN: ${t}`;}
		this._value = t;

		this.notifyForward();

		return this._value;
	}
	connect(n){
		if (!n) throw `n is undefined: ${n}`; 
		if (n.constructor.name!='Neuron')throw `ERROR not a neuron: ${n.constructor.name}`;
		this.outputs.push(n);
		n.inputs.push({neuron:this,weight:Math.random()*2-1});
		n.update();
	}
	notifyForward(unmute=false){
		if(this.mute && !unmute){
			//return;
		}
		this.mute = false;
		for (var a =0;a<this.outputs.length;a++){
			this.outputs[a].update();
		}
	}
	update(unmute = false){
		if (this.inputs.length == 0){
			this.notifyForward(unmute);
			return;
		}
		this._value = this.bias; 
		for (var a of this.inputs){
			var temp = a.neuron.value*a.weight;
			if(isNaN(parseFloat(temp)))throw `ERROR: ${a.neuron.value} and ${a.weigth}`;
			this._value += temp;
		}
		this.notifyForward(unmute);
	}
}