/*
 *  Exponentially weighted moving average.
 *  Args: 
 *  - alpha:
 */

/*
current rate will be measured per tick 

If current rate is X, and target rate (real rate) is 100*X
it will take roughtly 60 iterations 
for current rate to reach target rate for M1_ALPHA

*/
class EWMA{
	prevTime:number;
	alpha:number;
	initialized:boolean;
	currentRate:number;
	uncounted:number;
	
	constructor(alpha){
  		this.alpha = alpha;
		this.currentRate = undefined;
		this.uncounted = 0;
	}
	
	public update(n:number) {
  		this.uncounted += (n || 1);
	}
	
	public tick(){
		var  tickRate = this.uncounted ;
		this.uncounted = 0;

		if(this.currentRate) 
		{
			this.currentRate += this.alpha * (tickRate - this.currentRate);
		} else {
			this.currentRate = tickRate;
		}
	}
	
	public rate():number{
		return this.currentRate * 1000;		
	}
}

var M1_ALPHA = 1 - Math.exp(-5/60);
var M5_ALPHA = 1 - Math.exp(-5/60/5);
var M15_ALPHA = 1 - Math.exp(-5/60/15);

function createM1EWMA():EWMA{
	return new EWMA(M1_ALPHA);
} 
function createM5EWMA():EWMA{
	return new EWMA(M15_ALPHA);
} 
function createM15EWMA():EWMA{
	return new EWMA(M1_ALPHA);
} 

export{EWMA, createM1EWMA, createM5EWMA, createM15EWMA, M1_ALPHA, M5_ALPHA, M15_ALPHA}
