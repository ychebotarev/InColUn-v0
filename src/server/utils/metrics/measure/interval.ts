class Interval{
	startTime:number;
	endTime;
	
	constructor(){
		
	}
	
	public start(){
		this.startTime = Date.now();
	}
	
	public stop(){
		this.endTime = Date.now();
	}
	
	public value():number{
		if (!this.startTime || !this.endTime){
			return 0;
		}
		return this.endTime - this.startTime; 
	}
	
	public toJSON(name:string):Object{
		return {
			name:name
			, interval:this.value()
		}
	}
}

export {Interval}