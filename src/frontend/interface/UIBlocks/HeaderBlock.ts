import {DomElement} from '../../core/DomElement';
import {RenderNavbarHeader} from './NavbarHeader';
import {RenderNavbarMain} from './NavbarMain';


export class HeaderBlock extends DomElement{
    constructor(){
        super({tag:'div',className: 'navbar navbar-custom navbar-fixed-top'});        
    }
    
    protected RenderSelf(self:HTMLElement){
        RenderNavbarHeader(".navbar-collapse", self);
        RenderNavbarMain(".navbar-collapse", self);
    }
}