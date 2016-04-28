import {ILogger} from '../../interfaces/interfaces'

class MockLogger implements ILogger{
	logged:string[];
	
	constructor(){
		this.logged = []
	}
	
	public info(message:string){
		this.logged.push(message);
	}
	
	public debug(message:string){
		this.logged.push(message);
	}

	public error(message:string){
		this.logged.push(message);
	}
	
	public messages():string[]{
		return this.logged;
	} 
	public clear(){
		this.logged = [];
	}
}

export {MockLogger}