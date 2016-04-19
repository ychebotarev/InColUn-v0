
class Config{    
    //should be in [0-31] range, will be used to generate IDs
    instance_id:number;
	secret: string;
}

var server_config = new Config();
server_config.instance_id = 1001;
server_config.secret = 'supersecret';

export {server_config}