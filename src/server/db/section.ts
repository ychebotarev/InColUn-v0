import {env} from '../environment'
import {ISection} from '../interfaces/interfaces'

interface IDBSection{
    id:string,
    boardId:string,
    parentId:string,
    title:string
}

function convertToTree(parentId:string, dbSections:IDBSection[]):ISection[]{
    var sections:ISection[] = [];
    for(var i=0; i<dbSections.length;i++){
        if(dbSections[i].parentId == parentId){
            sections.push({
                id:dbSections[i].id,
                title:dbSections[i].title,
                childs:convertToTree(dbSections[i].id, dbSections)
            });
        }
    }
    return sections;
}

function createSectionsFromDB(parent_id:string, results:any[]):ISection[]{
    var dbSections:IDBSection[] = [];
    for (var i = 0; i < results.length; ++i) {
        dbSections.push({
            id: results[i].id,
            boardId: results[i].boardid,
            parentId: results[i].parentid,
            title: results[i].title
        });
    }
    
    return convertToTree(parent_id, dbSections);
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

export {getSections}