
class Config{
    db_url:string;
    
    //should be in [0-31] range, will be used to generate IDs
    instance_id:number;
   
}

var server_config = new Config();
server_config.db_url = 'mongodb://localhost/incolun_v0';

export {server_config}