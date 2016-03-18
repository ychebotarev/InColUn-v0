import {DOM} from './dom'
import {DomElementProps} from './DomElementProps';

class DomElement {
    props:DomElementProps;
    
    constructor(props:DomElementProps){
        this.props = props;
    }
    
    protected RenderSelf(self:HTMLElement){
        
    }
    
    public Render(renderTo:HTMLElement):HTMLElement{
        if(!this.props.tag){
            return;
        }
        
        var element = DOM.CreateFromProps(this.props);

        if (renderTo){
            renderTo.appendChild(element);
        }
        
        return element;
    }
}

function RenderDomElement(props:DomElementProps,renderTo:HTMLElement):HTMLElement{
    var element = new DomElement(props);
    return element.Render(renderTo);
}

export {DomElement, RenderDomElement}