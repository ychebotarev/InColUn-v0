import {DomElementProps, DomElementBase} from './DomElementBase';

class DomElementText extends DomElementBase{
    
    constructor(public text:string, props:DomElementProps){
        super(props);
    }
    
    protected RenderSelf(renderTo:HTMLElement){
        renderTo.innerText = this.text;
    }        
}

export {DomElementText}