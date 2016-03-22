import {DomElement} from '../../core/DomElement';

export class Brand extends DomElement{
    constructor(){
        super({tag:'a', className:'navbar-brand'});
    }
    
    protected RenderSelf(self:HTMLElement){
        self.innerText= 'InColUn';
    }
}