import {DomElement} from '../core/DomElement';
import {Box} from './Box';

class Section extends DomElement{
    public id:string;
    public title:string;
    private boxes:Box[];
    
    constructor(){
        super();
        this.tag = 'div'
    }
    
    protected RenderSelf(self:HTMLElement){
        this.RenderHeader(self);
        this.boxes.forEach(box => box.Render(self));
    }    
    
    private RenderHeader(root:HTMLElement){
        
    }
}

export {Section}