import {server_config} from '../config'
var biguint_format = require('biguint-format')

const ONE2 = Math.pow(2, 2) - 1;
const ONE4 = Math.pow(2, 4) - 1;
const ONE10 = Math.pow(2, 10) - 1;
const ONE12 = Math.pow(2, 12) - 1;
const ONE16 = Math.pow(2, 16) - 1;
const ONE20 = Math.pow(2, 20) - 1;

class FlakeIdGenerator{
	private shard_id:number;
	private epoch:number;
	private lastTime:number;
	private sequence_id:number;
	
	constructor(shard_id:number, epoch?:number){
		this.shard_id = shard_id;
		this.lastTime = Date.now();
		this.sequence_id = 0;
		this.epoch = epoch || 0;
	}
	
	public nextStr(type_id:number, time?:number):string{
		var buffer = this.next(type_id, time);
		return biguint_format(buffer, 'dec');
	}
	
	public next(type_id:number,time?:number):Buffer{
		var id = new Buffer(8);
		id.fill(0);
		var time = time || (Date.now() - this.epoch)
		//id = shard_id + type + timestamp + sequence_id
		
		//shard_id: 16 bit
		//type_id: 4 bit
		///timestamp: 32 bit
		//sequence_id: 10 bit
		
		// we are optimistic about overwlaws
		this.sequence_id = (time === this.lastTime)? ((this.sequence_id+1) & ONE10 ):0;
		
		this.lastTime = time;
		
		var s1 = (((this.shard_id & ONE16) << 16) | ((type_id & ONE4) << 12) | ((time >> 20) & ONE12) ) >>> 0;

		var s2 = (((time & ONE20) << 12) | (this.sequence_id & ONE10)) >>> 0;
		
		id.writeUInt32BE(s1,0);
		id.writeUInt32BE(s2,4);
			
		return id;	
	}
}

var flakeIdGenerator = new FlakeIdGenerator(server_config.instance_id)

export {flakeIdGenerator}