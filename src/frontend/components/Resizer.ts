import {DomElement} from '../core/DomElement';

export enum ResizeType{
    Horz,
    Vert,
    Both
}

export interface RisizerProps{
    type:ResizeType;
    onResizeStart?:(clientX:number, clientY:number)=>void;
}

export class Resizer extends DomElement{
    private resizerProps:RisizerProps;
    
    constructor(resizerProps:RisizerProps) {
        super({
            tag:'div', 
            className: Resizer.getClass(resizerProps.type)
        });
        this.resizerProps = resizerProps;
    }
    
    onTouchStart  = (event:TouchEvent) =>{
        var te=event.touches[0];  
        this.resizerProps.onResizeStart(te.clientX, te.clientY);
    }
    
    onResizeStart = (event:MouseEvent) =>{
        this.resizerProps.onResizeStart(event.clientX, event.clientY);
    }
    
    protected static getClass(type:ResizeType):string {
        switch(type){
            case ResizeType.Horz:
                return 'resizer_horz';
            case ResizeType.Vert:
                return 'resizer_vert';
            case ResizeType.Both:
                return 'resizer_both';
        }
    }
  
    RenderSelf(self:HTMLElement) {
        self.onmousedown = this.onResizeStart;
        self.ontouchstart = this.onTouchStart;
    }
}