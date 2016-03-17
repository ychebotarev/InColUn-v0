import {DomElementBase} from '../../core/DomElementBase';
import {RenderNavbarHeader} from './NavbarHeader';
import {RenderNavbarMain} from './NavbarMain';


export class HeaderBlock extends DomElementBase{
    constructor(){
        super({tag:'div',className: 'navbar navbar-custom navbar-fixed-top'});        
    }
    
    protected RenderSelf(self:HTMLElement){
        RenderNavbarHeader(".navbar-collapse", self);
        RenderNavbarMain(".navbar-collapse", self);
    }
}