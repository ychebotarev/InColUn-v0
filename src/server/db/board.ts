import * as db from './db'
import * as metrics from '../utils/metrics'

interface IBoard{
    title:string,
    created:Date,
    updated:Date,
    shared:number,
    saved:number,
    kudos:number
}

function createBoardsFromDB(results:any[]):IBoard[] {
    var boards:IBoard[] = [];
    for (var i = 0; i < results.length; ++i) {
        boards.push({
            title: results[i].title,
            created: results[i].created,
            updated: results[i].updated,
            shared: results[i].shared,
            saved: results[i].saved,
            kudos: results[i].kudos
        });
    }
    return boards;
}

function getBoards(id:number, callback:(success:boolean, message:string, boards?:IBoard[])=>void){
    var query = "select * from boards where userid = " + id;
    db.connectioPool.query(query, function (error, results) {
        if (error) {
            metrics.counterCollection.inc('dbfail');
            callback(false, 'Failed to get boards. ' + error.code);
            return;
        }
        var boards = createBoardsFromDB(results);
        callback(true, '', boards);
    });
}

export {IBoard, getBoards}