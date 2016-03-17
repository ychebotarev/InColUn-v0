import {DomElementProps, DomElementBase} from './DomElementBase';

abstract class DomContainerBase extends DomElementBase{
    children:DomElementBase[];
    
    constructor(props:DomElementProps){
        super(props);
        this.children = [];
    }
    
    public AddChild(child:DomElementBase){
        this.children.push(child);
    }
    
    protected RenderSelf(renderTo:HTMLElement){
        this.children.forEach( c=>c.Render(renderTo));            
    };
}

export {DomContainerBase}