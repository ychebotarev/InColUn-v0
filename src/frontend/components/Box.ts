import {Dom} from '../core/dom'
import {UIElement} from '../core/UIElement';
import {ResizeType, RisizerProps, Resizer} from './Resizer';


class BoxProps{
    x:number;
    y:number;
    w:number; 
    h:number;
}

class Box extends UIElement{
    private props:BoxProps;
    
    private content: HTMLElement;
    private domBox:HTMLElement;
    
    private horzResize:Resizer;
    private vertResize:Resizer;
    private bothResize:Resizer;
    
    public constructor(props:BoxProps){
        super();
        this.props=props;
        this.horzResize = new Resizer({ type:ResizeType.Horz });
    }
    
    protected CreateDom():HTMLElement{
        var div = Dom.div('internal-box');
        div.style.position='absolute';
        div.style.left = String(this.props.x)+'px';
        div.style.top = String(this.props.y)+'px';
        
        div.style.width = String(this.props.w)+'px';
        div.style.height = String(this.props.h)+'px';
        
        div.style.border='1px solid red';
        
        return div;
    }
    
    protected RenderSelf(self:HTMLElement){
        this.horzResize.Render(self);
    }
}

export {Box, BoxProps}