
import {Board} from './components/Board';
import {HeaderBlock} from './interface/UIBlocks/HeaderBlock'

class App{
    private root:HTMLElement;
    
    private boards:Board[];
    private activeBoardId:string;
    
    private header:HeaderBlock;
    
    constructor(){
        this.header = new  HeaderBlock();   
    }
    
    public onClick(command:string){
        console.log(command);
    }
    
    public SetRoot(root:HTMLElement){
        this.root = root;
    }

    public LoadBoardInfo(user:string){
        
    }
    
    public  AddBoard(board:Board){
        this.boards[board.getID()] = board;    
    }
    
    public Render(){
        this.header.Render(this.root);
    }
}

let application = new App();

export {application} 