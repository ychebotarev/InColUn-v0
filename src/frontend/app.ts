
import {Board} from './components/Board';
import {Dom} from './core/Dom'
import {CommandInfo,OnCommandCallback} from './core/CommandInfo'
import {SideBar} from './interface/UIBlocks/SideBar'
import {ContentArea} from './interface/UIBlocks/ContentArea'

class App{
    private root:HTMLElement;
    
    private commands : { [key:string]:OnCommandCallback; } = {};
    
    private boards:Board[];
    private activeBoardId:string;
    
    private sidebar:SideBar;
    private contentArea:ContentArea;
    
    constructor(){
        this.sidebar = new SideBar();
        this.contentArea = new ContentArea();
        
        var nodes = [
                {
                    info:{title:'level1 0 ', guid:'level1_0'}
                },
                {
                    info:{title:'level1_with_childs - 1', guid:'level1_1'},
                    subNodes:[
                        {info:{title:'child_level2_a long long long long', guid:'level1_1 level2_1'}},
                        {info:{title:'child_level2_b', guid:'level1_1 level2_2'}}
                    ]
                },
                {
                    info:{title:'level1_with_childs - 2', guid:'level1_2'},
                    subNodes:[
                        {
                            info:{title:'child_level2_a_with_childs long long title', guid:'level1_2 level2_1'},
                            subNodes:[
                                {info:{title:'child_level3_a', guid:'level1_2 level2_1 level3_1'}},
                                {info:{title:'child_level3_b', guid:'level1_2 level2_1 level3_2'}}
                            ]
                        },
                        {info:{title:'child_level2_b', guid:'level1_2 level2_2'}}
                    ]
                },
                {
                    info:{title:'level1 - 3', guid:'level1_3'}
                },
                {
                    info:{title:'level1_with_childs - 4', guid:'level1_4'},
                    subNodes:[
                        {info:{title:'child_level2_a', guid:'level1_4 level2_1'}},
                        {info:{title:'child_level2_b', guid:'level1_4 level2_2'}}
                    ]
                },
                {
                    info:{title:'level1 - 5', guid:'level1_5'}
                },
                {
                    info:{title:'level1_with_childs - 6', guid:'level1_6'},
                    subNodes:[
                        {info:{title:'child_level2_a', guid:'level1_6 level2_1'}},
                        {info:{title:'child_level2_b', guid:'level1_6 level2_2'}}
                    ]
                },
                {
                    info:{title:'level1 - 7', guid:'level1_7'}
                },
                {
                    info:{title:'level1_with_childs - 6', guid:'level1_8'},
                    subNodes:[
                        {
                            info:{title:'child_level2_a', guid:'level1_8 level2_1'},
                            subNodes:[
                                {
                                    info:{title:'child_level3_a', guid:'level1_8 level2_1 level3_1'},
                                    subNodes:[
                                        {
                                            info:{title:'child_level3_a', guid:'level1_8 level2_1 level3_1 level4_1'},
                                            subNodes:[
                                                {info:{title:'level1_8 level2_1 level3_1 level4_1 level5_1', guid:'level1_8 level2_1 level3_1 level4_1 level5_1'}},
                                                {info:{title:'level1_8 level2_1 level3_1 level4_1 level5_2', guid:'level1_8 level2_1 level3_1 level4_1 level5_2'}}
                                            ]
                                        },
                                        {info:{title:'child_level3_b', guid:'level1_8 level2_1 level3_1 level3_2'}}
                                    ]
                                    
                                },
                                {info:{title:'child_level3_b', guid:'level1_8 level2_1 level3_2'}}
                            ]
                            
                        },
                        {info:{title:'child_level2_b', guid:'level1_8 level2_2'}}
                    ]
                }
        ]; 
        this.sidebar.LoadTreeContainer(nodes);
        let openPageCallback:OnCommandCallback = (param1:{}, param2:{}) =>{ this.openpage(param1['guid'])}
        this.setCommandProcesor('OpenPage', openPageCallback);
    }
    
    public openpage(guid:string){
        console.log('Opening page '+guid);
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
        var sidebar = document.getElementById('sidebar_menu');
        console.log('rendering');
        if (sidebar != undefined){
            this.sidebar.RenderTo(sidebar);
        }
        else{
            console.log("can't find sidebar");
        }
        
        var content_area = document.getElementById('content_area');
        if (content_area != undefined){
            this.contentArea.Render(content_area);
        }
        else{
            console.log("can't find content_area");
        }
    }
}

let application = new App();

export {application} 