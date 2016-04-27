import * as db from './db'
import * as metrics from '../utils/metrics'

interface IRawSection{
    id:string,
    boardId:string,
    parentId:string,
    title:string
}

interface ISection{
    id:string,
    title:string,
    childs:ISection[]
}

function convertToTree(parentId:string, rawSections:IRawSection[]):ISection[]{
    var sections:ISection[] = [];
    for(var i=0; i<rawSections.length;i++){
        if(rawSections[i].parentId == parentId){
            sections.push({
                id:rawSections[i].id,
                title:rawSections[i].title,
                childs:convertToTree(rawSections[i].id, rawSections)
            });
        }
    }
    return sections;
}

function createSectionsFromDB(parent_id:string, results:any[]):ISection[]{
    var rawSections:IRawSection[] = [];
    for (var i = 0; i < results.length; ++i) {
        rawSections.push({
            id: results[i].id,
            boardId: results[i].boardid,
            parentId: results[i].parentid,
            title: results[i].title
        });
    }
    
    //build tree from sections list
    var sections = convertToTree(parent_id, rawSections);
        
    return sections;
}

function getSections(boardid:string, callback:(success:boolean, message:string, sections?:ISection[])=>void){
    var query = "select * from boards where userid = " + boardid;
     db.connectioPool.query(query, function (error, results) {
        if (error) {
            metrics.counterCollection.inc('dbfail');
            callback(false, 'Failed to get boards. ' + error.code);
            return;
        }
        var sections = createSectionsFromDB(boardid, results);
        callback(true, '', sections);
    });
}

export {ISection, getSections, IRawSection, convertToTree}