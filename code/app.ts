
import {Board} from './components/Board';
import {HeaderBlock} from './interface/UIBlocks/HeaderBlock'
import {CommandInfo} from './core/CommandInfo'
import {Dom} from './core/Dom'
import {SideBar} from './interface/UIBlocks/SideBar'

class App{
    private root:HTMLElement;
    
    private boards:Board[];
    private activeBoardId:string;
    
    private header:HeaderBlock;
    private sidebar:SideBar;
    
    constructor(){
        this.header = new HeaderBlock();
        this.sidebar = new SideBar();
        
        var nodes = [
                {
                    info:{title:'level1', guid:'level1'}
                },
                {
                    info:{title:'level1_with_childs - a', guid:'level1_with_childs - a'},
                    subNodes:[
                        {info:{title:'level2_a', guid:'level2_a'}},
                        {info:{title:'level2_b', guid:'level2_b'}}
                    ]
                },
                {
                    info:{title:'level1_with_childs - b', guid:'level1_with_childs - b'},
                    subNodes:[
                        {
                            info:{title:'level2_a_with_childs', guid:'level2_a_with_childs'},
                            subNodes:[
                                {info:{title:'level3_a', guid:'level3_a'}},
                                {info:{title:'level3_b', guid:'level3_b'}}
                            ]
                        },
                        {info:{title:'level2_b', guid:'level2_b'}}
                    ]
                }
            ]; 
        this.sidebar.LoadTreeContainer(nodes); 
    }
    
    public onClick(command:CommandInfo){
        console.log(command.command);
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
        var content=Dom.
        this.sidebar.Render(this.root);
    }
}

let application = new App();

export {application} 