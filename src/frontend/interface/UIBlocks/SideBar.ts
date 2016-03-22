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
    
    protected CreateDom():HTMLElement{
        return Dom.div();
    }
    
    protected RenderSelf(self:HTMLElement){
        this.treeContainer.Render(self);
    }
}