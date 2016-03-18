import {Dom} from '../../core/dom';
import {DomElement} from '../../core/DomElement';
import {classNames} from '../../lib/classNames';
import {NavBarToggleProps, NavBarToggle} from '../Bootstrap/NavBarToggle'
import {Brand} from '../Bootstrap/Brand'

export class NavbarHeader extends DomElement{
    navbar_collapse_target:string;
    
    constructor(navbar_collapse_target:string){
        super({tag : 'div', className : 'navbar-header'});
        this.navbar_collapse_target = navbar_collapse_target;        
    }
    
    protected RenderSelf(self:HTMLElement){
        self.appendChild(Dom.text('InColUn','a','navbar-brand'));
        var navBarToggle = new NavBarToggle({
            toggle:'collapse',
            target:this.navbar_collapse_target
        });
        navBarToggle.Render(self);
    }
}

export function RenderNavbarHeader(navbar_collapse_target:string, renderTo:HTMLElement){
    var navbarHeader = new NavbarHeader(navbar_collapse_target);
    navbarHeader.Render(renderTo);
}