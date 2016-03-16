import {DOM} from '../lib/DOM';

interface DomDescription{
    tag:         string;
    className?:  string;
    style?:      {};
    attributes?: {};
}

class DomElement implements DomDescription{
    tag:        string;
    className:  string;
    style:      {};
    attributes: {};

    protected RenderSelf(self:HTMLElement){
    }
    
    public Render(canvas:DocumentFragment | HTMLElement){
        if(!this.tag){
            return;
        }
        var element = DOM.Create(this.tag, this.className, this.style, this.attributes);
        
        this.RenderSelf(element); 
        canvas.appendChild(element);
    }    
}

export {DomDescription,DomElement}