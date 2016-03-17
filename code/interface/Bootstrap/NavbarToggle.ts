import {DomElementBase} from '../../core/DomElementBase';
import {DOM} from '../../lib/dom';

export class NavBarToggleProps{
    toggle:string;
    target:string;
}

export class NavBarToggle extends DomElementBase{
    constructor(toggle_props:NavBarToggleProps){
        super({
            tag : 'button', 
            className : 'navbar-toggle', 
            attributes : {
                'data-toggle':toggle_props.toggle, 
                'data-target':toggle_props.target
            } 
        });
    }
    
    protected RenderSelf(self:DocumentFragment){
        self.appendChild(DOM.Create('span','icon-bar'));
        self.appendChild(DOM.Create('span','icon-bar'));
        self.appendChild(DOM.Create('span','icon-bar'));
    }
}