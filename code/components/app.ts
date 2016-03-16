
import {Board} from './Board';
import {DOM} from '../utils/DOM'; 
import {DomElement} from './DomElement';

export class App{
    private root:HTMLElement;
    private boards:Board[];
    
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
        //this.boards.push(board);    
    }
    
    public Render(){
        //this.Header.render();
        //this.Sidebar.render();
    }
}