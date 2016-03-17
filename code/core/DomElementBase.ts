import {DOM} from '../lib/dom';

interface DomElementProps{
    tag:         string;
    className?:  string;
    style?:      {};
    attributes?: {};
}

abstract class DomElementBase {
    props:DomElementProps;
    
    constructor(props:DomElementProps){
        this.props = props;
    }

    protected abstract RenderSelf(renderTo:HTMLElement);
    
    public Render(renderTo:DocumentFragment | HTMLElement){
        if(!this.props.tag){
            return;
        }
        var element = DOM.Create(this.props.tag, this.props.className, this.props.style, this.props.attributes);
        
        this.RenderSelf(element); 
        renderTo.appendChild(element);
    }    
}

export {DomElementProps, DomElementBase}