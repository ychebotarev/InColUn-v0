import {DomElementBase} from '../core/DomElementBase';
import {Box} from './Box';

class Section extends DomElementBase{
    public id:string;
    public title:string;
    private boxes:Box[];
    
    constructor(){
        super({tag:'div'});
    }
    
    protected RenderSelf(self:HTMLElement){
        this.RenderHeader(self);
        this.boxes.forEach(box => box.Render(self));
    }    
    
    private RenderHeader(root:HTMLElement){
        
    }
}

export {Section}