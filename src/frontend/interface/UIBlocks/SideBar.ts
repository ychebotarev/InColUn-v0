import {Dom} from '../../core/dom'
import {UIElement} from '../../core/UIElement'
import {TreeContainer} from '../../components/TreeMenu/TreeContainer'
import {TreeNodeData} from '../../components/TreeMenu/TreeNodeData'

export class SideBar extends UIElement{
    private treeContainer:TreeContainer;
    
    constructor(){
        super();
    }
    
    public LoadTreeContainer(nodes:TreeNodeData[]){
        this.treeContainer = new TreeContainer(nodes);
    }
    
    public AddTreeNode(node:TreeNodeData){
        this.treeContainer.AddNode(node);
    }
    
    protected CreateDomImpl():HTMLElement{
        return Dom.div();
    }
    
    protected RenderSelf(){
        this.treeContainer.Render(this.self);
    }
}