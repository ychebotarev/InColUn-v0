import {DOM} from '../utils/DOM';
import {Resizer} from './Resizer';
import {DomElement} from './DomElement';

class Box implements DomElement{
    private content: HTMLElement;
    private domBox:HTMLElement;
    private horzResize:Resizer;
    
    public constructor(){
    }
    
    public Render(container:HTMLElement){
        this.domBox = DOM.Create("div");
    }
}

export {Box}