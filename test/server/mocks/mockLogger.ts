import {ILogger} from '../../../src/server/interfaces/interfaces'

class MockLogger implements ILogger{
	info_messages:string[];
	debug_messages:string[];
	
	constructor(){
		this.info_messages = []
		this.debug_messages = []
	}
	
	public info(message:string){
		this.info_messages.push(message);
	}
	
	public debug(message:string){
		this.debug_messages.push(message);
	}
}

export {MockLogger}