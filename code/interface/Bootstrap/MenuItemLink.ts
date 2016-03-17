import {DOM} from '../../lib/dom';
import {DomElementBase} from '../../core/DomElementBase';
import {application} from '../../App';
import {RenderGlyphIcon} from './glyphicon';

export interface MenuItemLinkProps{
    command:string;
    title?:string;
    icon?:string;
}

export class MenuItemLink extends DomElementBase{
    itemprops:MenuItemLinkProps;
    
    constructor(itemprops:MenuItemLinkProps){
        super({tag:'li'});
        this.itemprops = itemprops;
    }
    
    protected RenderSelf(renderTo:HTMLElement){
        if (this.itemprops.command){
            var a = <HTMLAnchorElement>DOM.Create('a');
            a.href='#';
            a.onclick = (ev:MouseEvent) => {application.onClick(this.itemprops.command)};
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
