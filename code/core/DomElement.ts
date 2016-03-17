import {DomElementProps, DomElementBase} from './DomElementBase';

class DomElement extends DomElementBase{
    constructor(props:DomElementProps){
        super(props);
    }
    
    protected RenderSelf(renderTo:HTMLElement){
        
    }
}

export {DomElement}