import {Dom} from '../core/dom';
import {UIElement} from '../core/UIElement';
import {Box} from './Box';

class Section extends UIElement{
    public id:string;
    public title:string;
    private boxes:Box[];
    
    constructor(){
        super();
    }
    
    protected CreateDom():HTMLElement{
        return Dom.div();
    }
    
    protected RenderSelf(self:HTMLElement){
        this.RenderHeader(self);
        this.boxes.forEach(box => box.Render(self));
    }    
    
    private RenderHeader(root:HTMLElement){
        
    }
}

export {Section}