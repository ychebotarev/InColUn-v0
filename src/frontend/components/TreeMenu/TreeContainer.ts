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
    
    public AddNode(node:TreeNodeData){
        this.nodes.push(new TreeNode(node, 0));
        
    }
    
    protected CreateDomImpl():HTMLElement{
        return Dom.div('treecontainer');
    }
    
    protected RenderSelf(){        
        var treelist = Dom.div('treelist');        
        this.nodes.forEach(node =>{
            node.Render(treelist);
        });
                
        this.self.appendChild(treelist);
    }
    
}