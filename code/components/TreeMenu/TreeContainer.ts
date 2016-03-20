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
        return Dom.div('treecontainer');
    }
    
    protected RenderSelf(self:HTMLElement){        
        var treelist = Dom.div('treelist');        
        this.nodes.forEach(node =>{
            node.Render(treelist);
        });
                
        self.appendChild(treelist);
    }
}