import {UIElement} from './UIElement';

abstract class UIContainer extends UIElement{
    children:UIElement[];
    
    constructor(){
        super();
        this.children = [];
    }
    
    public AddChild(child:UIElement){
        this.children.push(child);
    }
    
    protected RenderSelf(self:HTMLElement){
        this.children.forEach(c=>c.Render(self));            
    };
}

export {UIContainer}