/* JavaScript uses double-precision FP for all numeric types.  
 * Perhaps someday we'll have native 64-bit integers that can safely be
 * transported via JSON without additional code, but not today. */
var MAX_COUNTER_VALUE = Math.pow(2, 32); // 4294967296

class Counter{
	count:number;
	prevCount:number;
	constructor(){
		this.count = 0;
		this.prevCount = 0;
	}
	
	public fixate(){
		this.prevCount = this.count;
	}
	
	public changed():boolean{
		return this.prevCount != this.count;
	}
	
	public value():number{
		return this.count;
	} 
  
  	public inc(val?:number){
		if (!val) { val = 1; }
		this.count += val;
		// Wrap counter if necessary.
		if (this.count > MAX_COUNTER_VALUE) {
			this.count -= (MAX_COUNTER_VALUE + 1);
		}
  	}
	
	public dec(val?:number) {
  		if (!val) { val = 1; }
  		this.count -= val;
		if (this.count < 0) {
    		this.count = 0;
		}
  	}
	  
	public reset(){
		this.count = 0;	  
	}

	public toJSON(name:string):Object{
		return {
			name:name
			, count:this.value()
		}
	}
}

export {Counter}