import {Meter} from './measure/meter'

enum rateInterval{
	onesec,
	fivesec,
	onemin
}

class RateCollection{
	rates:{[id:string]:{rate:rateInterval, meter:Meter}}
	
	constructor(){
		this.rates = {}
		setInterval(()=>{this.update1sRates()}, 1000);
		setInterval(()=>{this.update5sRates()}, 5*1000);
		setInterval(()=>{this.update60sRates()}, 60*1000);
	}
	
	public add(name:string, interval:rateInterval):boolean{
		if(this.rates[name] != undefined){
			return false;
		}
		
		this.rates[name] = {rate:interval, meter:new Meter()}
		
		return true;
	}
	
	public update(name:string, n?:number):boolean{
		if(this.rates[name] != undefined){
			this.rates[name].meter.mark(n);
			return true;
		}
		return false;
	}
	
	private update1sRates(){
		this.updateRates(rateInterval.onesec);
	}
	private update5sRates(){
		this.updateRates(rateInterval.fivesec);
	}
	private update60sRates(){
		this.updateRates(rateInterval.onemin);
	}
	
	private updateRates(interval:rateInterval){
		for(var name in this.rates){
			if(this.rates[name].rate == interval){
				this.rates[name].meter.tick();
			}
		}
	}
}

var rateCollection = new RateCollection();
export {rateCollection,rateInterval}