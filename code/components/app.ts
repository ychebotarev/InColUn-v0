
import {Board} from './Board';
import {DomElement} from '../core/DomElement';

export class App{
    private root:HTMLElement;
    private boards:Board[];
    private activeBoardId:string;
    
    public static CreateApp(root:HTMLElement):App {
        var app = new App(root);
        return app;
    }
    
    constructor(root:HTMLElement){
        this.root = root;
    }
    
    public LoadBoardInfo(user:string){
        
    }
    
    public  AddBoard(board:Board){
        this.boards[board.getID()] = board;    
    }
    
    public Render(){
        //this.Header.render();
        //this.Sidebar.render();
        
        root.appendChild();
    }
}