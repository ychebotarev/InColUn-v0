import {Document, Schema, model} from 'mongoose';

interface IBoardInfo{
    guid:string;
    user:string;
    title:string;
    created:Date;
    updated:Date;
    snapshot:string;
}


interface IBoardInfoModel extends IBoardInfo, Document{};

let boardSchema = new Schema({
    guid:String,
    user:String,
    title:String,
    created:{ type: Date, default: Date.now },
    updated:{ type: Date, default: Date.now },
    snapshot:String
});

let Board = model<IBoardInfoModel>("Board", boardSchema);
    
export {Board}