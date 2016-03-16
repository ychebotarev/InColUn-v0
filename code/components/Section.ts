import {DomElement} from './DomElement';
import {DOM} from '../utils/DOM';
import {Box} from './Box';

class Section implements DomElement{
    public id:string;
    public title:string;
    private boxes:Box[];
    
    public Render(canvas:HTMLElement){
        var root = DOM.Create("div");
        this.RenderHeader(root);
        this.boxes.forEach(box => box.Render(root));
        canvas.appendChild(root);
    }    
    
    private RenderHeader(root:HTMLElement){
        
    }
}

export {Section}