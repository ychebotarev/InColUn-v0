abstract class Sample<T>{
	values:T[];
	count:number;
	
	constructor(){
		this.reset();
	}
	
	public init(){
		this.reset();
	}
	
	public reset(){
		this.values = []; 
		this.count = 0;
	}
	
	public update(value:T){
		this.values.push(value)
	}
	
	public toString(){
		
	}
	
	public size(){return this.values.length;} 
	
	public getValues (){ return this.values; }
	
}

export {Sample}