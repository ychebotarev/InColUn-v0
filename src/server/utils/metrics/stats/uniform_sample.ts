import {Sample} from './sample'

class UniformSample<T> extends Sample<T>{
	limit:number;
	
	constructor(limit:number){
		super();
		this.limit = limit;
	}
	
	public update(value:T) {
  		this.count++;
  		if (this.size() < this.limit) {
    		this.values.push(value);
  		} else {
    		var rand = Math.floor(Math.random() * this.count);
    		if (rand < this.limit)
      			this.values[rand] = value;
		}
  	}
	
	public init(){
		this.reset();
	}
	
	public reset(){
		this.values = []; 
		this.count = 0;
	}
	
	public toString(){
		
	}
	
	public size(){return this.values.length;} 
	
	public getValues (){ return this.values; }

	private getRandomInt() {
  		return Math.floor(Math.random() * this.limit) ;
	}	
}