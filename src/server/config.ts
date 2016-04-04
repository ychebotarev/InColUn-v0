
class Config{
    
    //should be in [0-31] range, will be used to generate IDs
    instance_id:number;
}

var server_config = new Config();
server_config.instance_id = 1;

export {server_config}