
import {Board} from './components/Board';
import {HeaderBlock} from './interface/UIBlocks/HeaderBlock'
import {CommandInfo,OnCommandCallback} from './core/CommandInfo'
import {SideBar} from './interface/UIBlocks/SideBar'

class App{
    private root:HTMLElement;
    
    private commands : { [key:string]:OnCommandCallback; } = {};
    
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
                        {info:{title:'child_level2_a', guid:'level2_a'}},
                        {info:{title:'child_level2_b', guid:'level2_b'}}
                    ]
                },
                {
                    info:{title:'level1_with_childs - b', guid:'level1_with_childs - b'},
                    subNodes:[
                        {
                            info:{title:'child_level2_a_with_childs', guid:'level2_a_with_childs'},
                            subNodes:[
                                {info:{title:'child_level3_a', guid:'level3_a'}},
                                {info:{title:'child_level3_b', guid:'level3_b'}}
                            ]
                        },
                        {info:{title:'child_level2_b', guid:'t_level2_b'}}
                    ]
                }
            ]; 
        this.sidebar.LoadTreeContainer(nodes);
        let openPageCallback:OnCommandCallback = (param1:{}, param2:{}) =>{ this.openpage(param1['guid'])}
        this.setCommandProcesor('OpenPage', openPageCallback);
    }
    
    public openpage(guid:string){
        
    }
    
    public setCommandProcesor(key:string, command:OnCommandCallback){
        this.commands[key]=command;
    }
    
    public removeCommandProcessor(key:string){
        this.commands[key] = undefined;
    }
    
    public onClick(command:CommandInfo){
        var dispatch = this.commands[command.command];
        if (dispatch === undefined){
            console.log(command.command);
        }
        
        dispatch(command.param1, command.param2);
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
        this.sidebar.Render(this.root);
        //this.mainpage.Render(this.root);
    }
}

let application = new App();

export {application} 