//import * as db from './db'
//import * as metrics from '../utils/metrics'
import {env} from '../environment'
import {IBoard} from '../interfaces/interfaces'

function createBoardsFromDB(results:any[]):IBoard[] {
    var boards:IBoard[] = [];
    for (var i = 0; i < results.length; ++i) {
        boards.push({
            id:results[i].boardid,
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

function getBoards(userid:string, callback:(success:boolean, message:string, boards?:IBoard[])=>void){
    var query = "select * from boards where userid = " + userid;
    env().db().query(query)
        .then(function (results:any[]) {
            var boards = createBoardsFromDB(results);
            callback(true, '', boards);
        }).catch(function(message:string){
            env().metrics().counters.inc('dbfail');
            callback(false, 'Failed to get boards. ' + message);
        });
}

export {getBoards}