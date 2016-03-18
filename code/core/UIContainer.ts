import {UIElement} from './UIElement';
import {Dom} from '../core/dom';

abstract class UIContainer extends UIElement{
    children:UIElement[];
    
    constructor(){
        super();
        this.children = [];
    }
    public AddChild(child:UIElement){
        this.children.push(child);
    }

    protected CreateDom():HTMLElement{
        return Dom.div();
    }
    
    protected RenderSelf(self:HTMLElement){
        this.children.forEach(c=>c.Render(self));            
    };
}

export {UIContainer}