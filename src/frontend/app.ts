
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
                    info:{title:'My boards', guid:'my_boards', commandInfo:{command:'OpenBoards'}}
                },
                {
                    info:{title:'Saved boards', guid:'saved_boards', commandInfo:{command:'OpenSavedBoards'}}
                },
                {
                    info:{title:'Misc Information', guid:'57be4c62-5ca1-4800-974f-11b7e92eda37'},
                    subNodes:[
                        {
							info:{title:'Statistic lactures', guid:'1d010db1-0980-4708-8c57-24d640717998'},
                            subNodes:[
                                {info:{title:'Lecture 1', guid:'74253706-fdef-4acc-9bd5-15c3ae7e5bf7'}},
                                {info:{title:'Definition', guid:'ece1cfeb-cac2-477d-94d9-5e880d21ea2d'}},
                                {info:{title:'Lecture 2', guid:'b0e7cd43-e9d6-4f20-9c40-da4b30947db3'}},
                                {info:{title:'Definition', guid:'c30ed5f5-075a-4e63-a4c3-8df587eb5d1c'}},
                                {info:{title:'Type of variables', guid:'83301322-95e8-41ac-ac4c-eac7a121a028'}},
                                {info:{title:'Correlation and measure', guid:'a93f94b5-27a0-4abb-85bc-16d0a397e86d'}}
                            ]
						},	
                        {
							info:{title:'Film and books', guid:'ee69e02c-9663-4a96-b6f9-3d289246f07d'},
                            subNodes:[
                                {info:{title:'Books to read', guid:'ae5d3e4b-191e-4da8-9cae-cf73731747a9'}},
								{info:{title:'Favourite book', guid:'db6c23d8-1408-493b-b4bd-74ff4e865edb'}},
								{info:{title:'Movies to watch', guid:'15ceda6a-2b36-45b4-a13e-87edf0ebd2cb'}}
							]
						},	
                        {
							info:{title:'Ukraine', guid:'0cdc9c6c-d7d9-41c2-9c7d-4666fb702b37'},
                            subNodes:[
                                {info:{title:'Odessa, what happen on may 2', guid:'5c47797a-e4b2-4fbe-ba9f-23a4989c10ae'}},
								{info:{title:'Ukrainian nationalists', guid:'level1_2 level2_1 level3_1'}},
								{info:{title:'Civil war at Ukraine', guid:'level1_2 level2_1 level3_1'}},
								{info:{title:'Референдум', guid:'level1_2 level2_1 level3_1'}},
								{info:{title:'Знаковые видео', guid:'level1_2 level2_1 level3_1'}},
								{info:{title:'Фейки украинских СМИ', guid:'level1_2 level2_1 level3_1'}},
								{info:{title:'Разное', guid:'level1_2 level2_1 level3_1'}},
								{info:{title:'Порошенко', guid:'level1_2 level2_1 level3_1'}},
								{info:{title:'ВСУ', guid:'level1_2 level2_1 level3_1'}}
							]
						},	
                        {
							info:{title:'Interview questions', guid:'level1_1 level2_1'},
                            subNodes:[
                                {info:{title:'Google interview questions', guid:'level1_2 level2_1 level3_1'}},
								{info:{title:'More standard questions info', guid:'level1_2 level2_1 level3_1'}},
								{info:{title:'Истории для интервью', guid:'level1_2 level2_1 level3_1'}},
								{info:{title:'Топики для интервью', guid:'level1_2 level2_1 level3_1'}},
								{info:{title:'Multithreading', guid:'level1_2 level2_1 level3_1'}},
								{info:{title:'Not job related questions', guid:'level1_2 level2_1 level3_1'}},
							]
						},	
                        {info:{title:'Food questions', guid:'level1_1 level2_1'}},	
                        {
							info:{title:'Job search', guid:'level1_1 level2_1'},
                            subNodes:[
                                {info:{title:'Current process', guid:'level1_2 level2_1 level3_1'}},
								{info:{title:'Important algorithm', guid:'level1_2 level2_1 level3_1'}},
								{info:{title:'c++ interview questions', guid:'level1_2 level2_1 level3_1'}}
							]
						},	
                        {info:{title:'Training - Jym', guid:'level1_1 level2_1'}},	
                        {info:{title:'Team Leading', guid:'level1_1 level2_1'}},	
					]
                },
                {
                    info:{title:'GTD', guid:'level1_2'},
                    subNodes:[
                        {
                            info:{title:'Tasks', guid:'level1_2 level2_1'},
                            subNodes:[
                                {info:{title:'child_level3_a', guid:'level1_2 level2_1 level3_1'}},
                                {info:{title:'child_level3_b', guid:'level1_2 level2_1 level3_2'}}
                            ]
                        },
                        {info:{title:'Weekly review', guid:'level1_2 level2_2'}},
                        {info:{title:'Backlog', guid:'level1_2 level2_2'}},
                        {info:{title:'Project List', guid:'level1_2 level2_2'}}
                    ]
                },
                {
                    info:{title:'Recycled Boards', guid:'level1_3',commandInfo:{command:'OpenRecycledBoards'}}
                }
        ]; 
        this.sidebar.LoadTreeContainer(nodes);
        let openPageCallback:OnCommandCallback = (param1:{}, param2:{}) =>{ this.contentArea.OnOpenPage(param1['guid'])}
        this.SetCommandDispatcher('OpenPage', openPageCallback);
		this.SetCommandDispatcher('OpenBoards', () => { this.contentArea.OnOpenBoards()});
		this.SetCommandDispatcher('OpenSavedBoards', () => { this.contentArea.OnOpenSavedBoards()});
		this.SetCommandDispatcher('OpenRecycledBoards', () => { this.contentArea.OnOpenRecycledBoards()});
    }
    
	public SetCommandDispatcher(key:string, command:OnCommandCallback){
        this.commands[key]=command;
    }
    
    public RemoveCommandDispatcher(key:string){
        this.commands[key] = undefined;
    }
    
    public OnCommand(commandInfo:CommandInfo){
        var dispatch = this.commands[commandInfo.command];
        if (dispatch === undefined){
            console.log("Can't find handle for command: "+commandInfo.command);
        }
		else {        
        	dispatch(commandInfo.param1, commandInfo.param2);
		}
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