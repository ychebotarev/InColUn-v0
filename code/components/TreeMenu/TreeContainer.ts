import {Dom} from '../../core/dom';
import {classNames} from '../../lib/classNames';
import {UIElement} from '../../core/UIElement';
import {TreeNodeData} from './TreeNodeData'
import {TreeNode} from './TreeNode'

export class TreeContainer extends UIElement{
    nodes:TreeNode[];
    constructor(nodes:TreeNodeData[]){
        super();
        this.nodes = [];
        nodes.forEach(
            node =>{
                this.nodes.push(new TreeNode(node, 0));
            } 
        );
    }
    
    protected CreateDom():HTMLElement{
        return Dom.div('treeContainer');
    }
    
    protected RenderSelf(self:HTMLElement){        
        var ul = Dom.ul('treenodes top');        
        this.nodes.forEach(node =>{
            node.Render(ul);
        });
                
        self.appendChild(ul);
    }
}