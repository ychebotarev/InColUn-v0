import {DomElement} from '../../core/DomElement';

export class BoardsInfoBlock extends DomElement{
    constructor(){
        super();
        this.tag = 'div';
        this.className = 'BoardsInfoBlock';        
    }
    
    protected RenderSelf(self:DocumentFragment){
    }
}