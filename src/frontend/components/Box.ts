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
    
    private horzResize:Resizer;
    private vertResize:Resizer;
    private bothResize:Resizer;
    
    private direction:ResizeType;
    
    public constructor(props:BoxProps){
        super();
        this.props=props;
        this.horzResize = new Resizer({ type:ResizeType.Horz });
        this.vertResize = new Resizer({ type:ResizeType.Vert });
        this.bothResize = new Resizer({ type:ResizeType.Both });
    }
    
    protected CreateDom():HTMLElement{
        this.content = Dom.div('internal-box');
        this.content.style.position='absolute';
        this.content.style.left = String(this.props.x)+'px';
        this.content.style.top = String(this.props.y)+'px';
        
        this.content.style.width = String(this.props.w)+'px';
        this.content.style.height = String(this.props.h)+'px';
        
        this.content.style.border='1px solid red';
        this.content.style.backgroundColor = "green";
        return this.content;
    }
    
    protected RenderSelf(self:HTMLElement){
        this.horzResize.Render(self);
        this.vertResize.Render(self);
        this.bothResize.Render(self);
    }
    
    protected OnResizeStart(direction, e) {
    if (window.getComputedStyle === undefined) {
      console.warn("This browser not support window.getComputedStyle, react-resizable-box need it");
      return;
    }
    const style = window.getComputedStyle(this.content, null);
    const width = ~~style.getPropertyValue("width").replace('px', '');
    const height = ~~style.getPropertyValue("height").replace('px', '');
    
    this.setState({
      original : {
        x : e.clientX,
        y : e.clientY,
        width,
        height
      },
      isActive : true,
      direction
    });
  }
    
}

export {Box, BoxProps}