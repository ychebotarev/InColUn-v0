import {Dom} from '../../core/dom';
import {DomElement} from '../../core/DomElement';
import {application} from '../../App';
import {RenderGlyphIcon} from './glyphicon';
import {CommandInfo} from '../../core/CommandInfo' 

export interface MenuItemLinkProps{
    commandInfo?:CommandInfo;
    title?:string;
    icon?:string;
}

export class MenuItemLink extends DomElement{
    itemprops:MenuItemLinkProps;
    
    constructor(itemprops:MenuItemLinkProps){
        super({tag:'li'});
        this.itemprops = itemprops;
    }
    
    protected RenderSelf(renderTo:HTMLElement){
        if (this.itemprops.commandInfo){
            var a = Dom.a();
            a.href='#';
            a.onclick = (ev:MouseEvent) => {application.onClick(this.itemprops.commandInfo)};
            this.RenderInnerHtml(a);
            renderTo.appendChild(a);
        }
        else{
            this.RenderInnerHtml(renderTo);
        }           
    }
    
    protected RenderInnerHtml(renderTo:HTMLElement){
        if (this.itemprops.icon){
            RenderGlyphIcon(this.itemprops.icon,renderTo);                 
        }
        else{
            renderTo.innerText = this.itemprops.title;
        }
    }
}

export function RenderNavbarMenuItemLink(props:MenuItemLinkProps, renderTo:HTMLElement){
    var element = new MenuItemLink(props);
    element.Render(renderTo);
}
