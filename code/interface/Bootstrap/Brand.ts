import {DomElementBase} from '../../core/DomElementBase';
import {classNames} from '../../lib/classNames';

export class Brand extends DomElementBase{
    constructor(){
        super({tag:'a', className:'navbar-brand'});
    }
    
    protected RenderSelf(self:HTMLElement){
        self.innerText= 'InColUn';
    }
}