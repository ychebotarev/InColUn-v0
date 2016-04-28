import {env} from '../environment'

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

interface IGetSections{
    success:boolean,
    message:string,
    sections?:ISection[]
}

function getSections(userid:string, boardid:string):Promise<ISection[]>{
    //TODO - check if user can load this boards
    const p:Promise<ISection[]> = new Promise<ISection[]>((resolve,reject) =>{
        var query = "select * from sections where boardid = " + boardid;
        env().db().query(query)
            .then(function (results) {
                var sections = createSectionsFromDB(boardid, results);
                resolve(sections);
            })
            .catch(function (message:string) {
                env().metrics().counters.inc('dbfail');
                reject('Failed to get sections. ' + message);
            })
    })
    return p;
}

export {ISection, getSections}