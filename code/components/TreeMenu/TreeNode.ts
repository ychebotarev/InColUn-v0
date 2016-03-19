import {Dom} from '../../core/dom';
import {classNames} from '../../lib/classNames';
import {UIElement} from '../../core/UIElement';
import {DomElement,RenderDomElement} from '../../core/DomElement';
import {TreeNodeInfo, TreeNodeData} from './TreeNodeData'
import {CommandInfo} from '../../core/CommandInfo'
import {application} from '../../App';

export class TreeNode extends UIElement{
    private info:TreeNodeInfo;
    private level:number;
    private open:boolean;
    private nodes:TreeNode[];
    
    constructor(nodeInfo:TreeNodeData, level:number){
        super();
        this.info = nodeInfo.info;
        this.level = level;
        this.nodes = [];
        this.open=true;
        if(nodeInfo.subNodes){
            nodeInfo.subNodes.forEach(
                node =>{
                    this.nodes.push(new TreeNode(node, level+1));
                } 
            )
        }
    }
    
    protected CreateDom():HTMLElement{
        return Dom.Create('div','treeNode');
    }
    
    protected RenderSelf(self:HTMLElement){
        var li = Dom.li('treenodes leaf');
        var node =this.RenderNode();
        li.appendChild(node);
        self.appendChild(li);
    }
    
    private RenderNode():HTMLElement{
        if(this.nodes){
            //create expandable element
            var divWrapper = Dom.div('treenodes leaf');
            var divHeader =  Dom.span('treenodes header');
            divHeader.innerText = this.info.title;
            divWrapper.appendChild(divHeader);
            if (this.open){
                
                var icon = Dom.bootstrap_icon('menu-up');
                divWrapper.appendChild(icon);
                var ul =  RenderDomElement({ tag:'ul',className : 'treenodes leaf'},divWrapper);
                this.RenderSubnodes(ul);
                divWrapper.appendChild(ul);
            }
            
            return divWrapper;
        }
        else{
            //create simple link with onClick sending command to app
            var a = Dom.a();
            a.href='#';
            a.onclick = (ev:MouseEvent) => {application.onClick(this.info.command)};
            a.innerText = this.info.title;
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