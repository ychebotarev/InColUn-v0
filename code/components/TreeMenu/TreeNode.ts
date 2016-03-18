import {DOM} from '../../lib/dom';
import {classNames} from '../../lib/classNames';
import {UIElement} from '../../core/UIElement';
import {DomElement,RenderDomElement} from '../../core/DomElement';
import {DomContainer} from '../../core/DomContainer';
import {TreeNodeInfo, TreeNodeData} from './TreeNodeData'
import {CommandInfo} from '../../core/CommandInfo'
import {application} from '../../App';

export class TreeNode extends UIElement{
    info:TreeNodeInfo;

    
    level:number;
    open:boolean;
    nodes:TreeNode[];
    
    constructor(nodeInfo:TreeNodeData, level:number){
        super();
        this.info = nodeInfo.info;
        //super({tag : 'div', className : 'treeNode'});
        this.level = level;
        this.nodes = [];
        nodeInfo.subNodes.forEach(
            node =>{
                this.nodes.push(new TreeNode(node, 0));
            } 
        );
    }
    
    protected CreateDom():HTMLElement{
        return DOM.Create('div','treeNode');
    }
    
    
    protected RenderSelf(self:HTMLElement){
        var li = new DOM.Create('li','treenodes leaf');
        self.appendChild(li);
        var node  =this.RenderNode(li);
        this.RenderSubnodes(node);
        
    }
    
    private RenderNode(renderTo:HTMLElement):HTMLElement{
        if(this.nodes){
            //create expandable element
            var divWrapper = DOM.Create('div','treenodes leaf');
            var divHeader =  RenderDomElement({ tag:'div',className : 'treenodes header'},divWrapper);
            
            if (this.open){
                var ul =  RenderDomElement({ tag:'ul',className : 'treenodes leaf'},divWrapper);
                this.RenderSubnodes(ul);
            }
        }
        else{
            //create simple link with onClick sending command to app
            var a = <HTMLAnchorElement>DOM.Create('a');
            a.href='#';
            a.onclick = (ev:MouseEvent) => {application.onClick(this.info.command)};
            renderTo.appendChild(a);
            renderTo.innerText = this.info.title;
            return a;
        }
    }
    private RenderSubnodes(renderTo:HTMLElement){
        if(!this.nodes){
            return;
        }
        
        if(!this.open){
            return;
        }
        this.nodes.forEach(node =>{ node.Render(renderTo)});
    }
}

