import {DomElement} from './DomElement';

class DomContainer extends DomElement{
    children:DomElement[];
    public AddChild(child:DomElement){
        this.children.push(child);
    }
    
    protected RenderSelf(self:HTMLElement){
        this.children.forEach( c=>c.Render(self));            
    };
}

export {DomContainer}