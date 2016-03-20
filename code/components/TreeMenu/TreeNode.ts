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
    
    public Toggle(target:EventTarget){
        var node = document.getElementById(this.info.guid);
        if (!node){
            return;
        }
        
        this.open = !this.open;
        
        node.
    }http://jsfiddle.net/R6EAW/3495/
    
    protected CreateDom():HTMLElement{
        var node = Dom.Create('div','treenode'); 
        node.id = this.info.guid;
        return node;
    }
    
    protected RenderSelf(self:HTMLElement){
        var header = this.RenderHeader();
        var childs = this.RenderChilds();
        
        self.appendChild(header);
        self.appendChild(childs);
    }
    
    private RenderHeader(){
        var treeheader = Dom.div('treeheader');
        treeheader.appendChild(
            Dom.element('i', "treeitem-icon glyphicon glyphicon-file  pull-left", {color:'rgb(241,202,93)'}));
        treeheader.appendChild(
            Dom.text(this.info.title,'span'));
        if(this.nodes)
        {
            var icon = Dom.element('i', 'tree-toggle glyphicon glyphicon-chevron-'+this.open ? 'up':'down', {color:'grey'})
            icon.onclick = (ev:MouseEvent) => {
                this.Toggle(ev.target);
            }
            treeheader.appendChild(icon);
        }   
    }
    
    private RenderChilds(){
        
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