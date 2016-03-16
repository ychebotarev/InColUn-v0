import {DomElement} from '../../core/DomElement';

export class HeaderBlock extends DomElement{
    constructor(){
        super();
        this.tag = 'div';
        this.className = 'HeaderBlock';        
    }
    
    protected RenderSelf(self:DocumentFragment){
    }
}