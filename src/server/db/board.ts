import {env} from '../environment'
import {IBoard} from '../../common/interfaces'

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

async function getBoards(userid:string):Promise<IBoard[]>{
	var query = "select * from boards where userid = " + userid;
	var results:any = await env().db().query(query)
	var boards = createBoardsFromDB(results);
	return boards;
}

async function getRecent(userid:string):Promise<IBoard[]>{
	var query = "select * from recent where userid = " + userid;
	var results = await env().db().query(query)
	var boards = createBoardsFromDB(results);
	return boards;
}

async function getOpened(userid:string):Promise<IBoard[]>{
	var query = "select * from opened where userid = " + userid;
	var results = await env().db().query(query)
	var boards = createBoardsFromDB(results);
	return boards;
}

async function getBoard(userid:string, boardid:string):Promise<IBoard>{
	//TODO CHECK IF USER HAS ACCESS TO THIS BOARD
	var query = 'select * from boards where boardid = ' + boardid;
	var results = await env().db().query(query)
	var boards = createBoardsFromDB(results);
	
	if (!boards || boardid.length != 1){
		throw 'too many boards for ' + boardid;
	}
	return boards[0];
	
}

export {getBoards, getBoard, getRecent}