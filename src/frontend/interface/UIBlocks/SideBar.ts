import {Dom} from '../../core/dom'
import {UIElement} from '../../core/UIElement'
import {TreeContainer} from '../../components/TreeMenu/TreeContainer'
import {TreeNodeData} from '../../components/TreeMenu/TreeNodeData'

export class SideBar {
    private treeContainer:TreeContainer;
    
    constructor(){
    }
    
    public LoadTreeContainer(nodes:TreeNodeData[]){
        this.treeContainer = new TreeContainer(nodes);
    }
    
    public AddTreeNode(node:TreeNodeData){
        this.treeContainer.AddNode(node);
    }
    
    public RenderTo(sidebar:HTMLElement){
        this.treeContainer.Render(sidebar);
    }
}