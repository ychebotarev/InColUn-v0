import {DomElement} from '../core/DomElement';
import {ResizeType, RisizerProps, Resizer} from './Resizer';

class Box extends DomElement{
    
    private content: HTMLElement;
    private domBox:HTMLElement;
    
    private horzResize:Resizer;
    private vertResize:Resizer;
    private bothResize:Resizer;
    
    public constructor(){
        super({tag:'div'});
        this.horzResize = new Resizer({ type:ResizeType.Horz });
    }
    
}

export {Box}