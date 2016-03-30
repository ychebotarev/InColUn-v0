import {Document, Schema, model} from 'mongoose';

interface ISectionInfo{
    guid:string;
    board:string;
    parent_guid:string;
    title:string;
    created:Date;
    updated:Date;
    snapshot:string;
}


interface ISectionInfoModel extends ISectionInfo, Document{};

let sectionSchema = new Schema({
    guid:String,
    parent_guid:String,
    title:String,
    created:{ type: Date, default: Date.now },
    updated:{ type: Date, default: Date.now },
    snapshot:String
});

let Section = model<ISectionInfoModel>("Section", sectionSchema);
    
export {Section
    }