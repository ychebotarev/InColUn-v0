import {EWMA,M1_ALPHA} from '../stats/ewma'

class Meter{
	rate:EWMA;
	count:number;
	startTime:number;
	
	constructor(alpha?:number){
		alpha = alpha || M1_ALPHA;
  		this.rate = new EWMA(alpha);
  		this.count = 0;
		this.startTime = Date.now();
	}

	public mark(n?:number) {
  		if (!n) { n = 1; }
  		this.count += n;
  		this.rate.update(n);
	}
	
	rates() {
  		return {rate: this.rate.rate()
      	, mean: this.meanRate()};
	}

	meanRate = function() {
  		return this.count / ((new Date).getTime() - this.startTime) * 1000;
	}

	toJSON(name:string) {
  		return { name:name
			, type: 'meter'
      		, count: this.count
      		, rate: this.rate.rate()
      		, mean: this.meanRate()
      		, unit: 'seconds'};
	}
	
	public tick(){
  		this.rate.tick();
	}
}

export {Meter}