
class Config{
    url:string;
}

var configDb = new Config();
configDb.url = 'mongodb://localhost/incolun_v0';

export {configDb}