import {Dom} from '../../core/dom';
import {DomElement} from '../../core/DomElement';

export class NavBarToggleProps{
    toggle:string;
    target:string;
}

export class NavBarToggle extends DomElement{
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
        self.appendChild(Dom.element('span','icon-bar'));
        self.appendChild(Dom.element('span','icon-bar'));
        self.appendChild(Dom.element('span','icon-bar'));
    }
}