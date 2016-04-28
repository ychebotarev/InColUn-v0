import {env} from '../../environment'
import {MockDb} from './mockDb'
import {MockLogger} from './mockLogger'
import {MockMetrics} from './mockMetrics'

function setupMockEnvironment(){
	var logger = new MockLogger();
	var metrics = new MockMetrics();
	var db = new MockDb(); 
	env().setDb(db);
	env().setLogger(logger);
	env().setMetrics(metrics);
}


export {setupMockEnvironment}