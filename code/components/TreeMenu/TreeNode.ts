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
        
        var treelist = document.getElementById('tl_'+this.info.guid);
        if (!treelist){
            return;
        }
        
        treelist.style.display = this.open? 'block':'none';
    }
    
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
    
    private RenderHeader():HTMLElement{
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
        
        return treeheader;
    }
    
    private RenderChilds(){
        if(!this.nodes)
        {
            return;
        }
        
        var treelist = Dom.div('treelist');
        treelist.id = 'tl_'+this.info.guid;
        this.nodes.forEach(node =>{ node.Render(treelist)});
        
        if(!this.open){
            treelist.style.display='none'
        }
        
        return treelist;
    }    
}