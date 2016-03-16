import {DOM} from '../../utils/DOM';

class DomElement{
    Render(canvas:DocumentFragment | HTMLElement){
        var tag = this.GetTag();
        var attributes = this.GetAttributes();
        var element = DOM.Create(tag, attributes);
        
        this.RenderSelf(element); 
        
        canvas.appendChild(element);
    }    
}

export {DomElement}