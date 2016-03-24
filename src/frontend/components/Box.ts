import {Dom} from '../core/dom'
import {UIElement} from '../core/UIElement';
import {ResizeDirection, RisizerProps, BoxResizer} from './BoxResizer';
import {BoxDraggerProps, BoxDragger} from './BoxDragger';

enum BoxAction{
    none,
    resize,
    drag
} 

class BoxDimentions{
    x:number;
    y:number;
    w:number; 
    h:number;
}

class BoxInfo{
    guid:string;
}

class BoxState{
    dimentions:BoxDimentions;
    original:BoxDimentions;
    action:BoxAction;
    direction:ResizeDirection;
}

class Box extends UIElement{
    private info:BoxInfo;
    private state:BoxState;
    
    private dragger:BoxDragger;
    private horzResize:BoxResizer;
    
    private content: HTMLElement;
    
    public constructor(info:BoxInfo, dimention:BoxDimentions){
        super();
        this.info=info;
        this.state = new BoxState();
        this.state.dimentions = dimention;
        this.state.action = BoxAction.none;
        
        let onResizeStart = (direction:ResizeDirection, clientX:number, clientY: number) => {
                this.OnResizeStart(direction, clientX, clientY)
        }
        
        let onDragStart = (clientX:number, clientY: number) => {
            this.OnDragStart(clientX, clientY);
        }
            
        let onTouchMove = (ev:TouchEvent) => {this.OnTouchMove(ev);};
        
        let onMouseMove = (ev: MouseEvent) => {this.OnMouseMove(ev.clientX, ev.clientY);};
        let onMouseUp = (ev: MouseEvent) => {this.OnMouseUp(ev);};            
        
        this.horzResize = new BoxResizer({ direction:ResizeDirection.Horz, onResizeStart});
        this.dragger = new BoxDragger(onDragStart);
        
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('touchmove', onTouchMove);
        window.addEventListener('touchend', onMouseUp);
    }
    
    protected OnTouchMove(ev: TouchEvent){
        this.OnMouseMove(ev.touches[0].clientX, ev.touches[0].clientY);
    }
    
    protected OnResize(clientX:number, clientY:number){
        const { dimentions, original, action, direction } = this.state;
        
        console.log('OnMouseMove at'+clientX+':'+clientY+',box: ' +this.info.guid);
        let newWidth = original.w;
        let newHeight = original.h;
        
        if (direction == ResizeDirection.Horz || direction == ResizeDirection.Both) {
            newWidth = original.w + clientX - original.x;
        }
        
        if (direction == ResizeDirection.Vert || direction == ResizeDirection.Both) {
            newHeight = original.h + clientY - original.y;
        }
        
        if(newWidth == dimentions.w && newHeight == dimentions.h){
            return;
        }
        this.state.dimentions.w = newWidth;
        this.state.dimentions.h = newHeight;
        
        this.SetDimentions();
    }
    
    protected OnDrag(clientX:number, clientY:number){
        
    }

    protected OnMouseMove(clientX:number, clientY:number){
        if (this.state.action == BoxAction.none){
            return;
        }
        
        if(this.state.action == BoxAction.resize){
            this.OnResize(clientX, clientY);
        }
        
        if(this.state.action == BoxAction.drag){
            this.OnDrag(clientX, clientY);
        }
    }
    
    protected OnMouseUp(ev:MouseEvent){
        if (this.state.action == BoxAction.none){
            return;
        }
        console.log('OnMouseUp at'+ev.clientX+':'+ev.clientY+',box: ' +this.info.guid);
        
        this.state.action = BoxAction.none;
    }
    
    protected OnMouseEnter(){
        
    }
    
    protected OnMouseLeave(){
        
    }
    
    protected SetDimentions(){
        this.content.style.left = String(this.state.dimentions.x)+'px';
        this.content.style.top = String(this.state.dimentions.y)+'px';
        
        this.content.style.width = String(this.state.dimentions.w)+'px';
        this.content.style.height = String(this.state.dimentions.h)+'px';
    }
    
    protected CreateDom():HTMLElement{
        this.content = Dom.div('internal-box');
        this.content.style.position='absolute';
        
        this.content.style.border='1px solid red';
        this.content.style.backgroundColor = "green";
        this.content.onmouseenter = (ev:MouseEvent) => { this.OnMouseEnter();}
        this.content.onmouseleave = (ev:MouseEvent) => { this.OnMouseLeave();}
        
        this.SetDimentions();
        return this.content;
    }
    
    protected RenderSelf(self:HTMLElement){
        this.horzResize.Render(self);
        this.dragger.Render(self);
    }
    
    protected OnDragStart(clientX:number, clientY: number){
        console.log("OnDragStart");
        
        this.state.action = BoxAction.drag;
        this.state.original = {x : clientX, y : clientY, w : this.state.dimentions.w, h : this.state.dimentions.h}
    }
    
    protected OnResizeStart(direction:ResizeDirection, clientX:number, clientY: number) {
        console.log("OnResizeStart");
        
        this.state.action = BoxAction.resize;
        this.state.direction=direction;
        this.state.original = {x : clientX, y : clientY, w : this.state.dimentions.w, h : this.state.dimentions.h}
    }
}

export {Box, BoxInfo, BoxDimentions}