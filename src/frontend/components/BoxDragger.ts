import {DomElement} from '../core/DomElement';

export interface BoxDraggerProps{
    onDragStart?:(clientX:number, clientY:number)=>void;
}

export class BoxDragger extends DomElement{
    private draggerProps:BoxDraggerProps;
    
    constructor(draggerProps:BoxDraggerProps) {
        super({
            tag:'div', 
            className: 'box-dragger'
        });
        
        this.draggerProps = draggerProps;
    }
    
    onTouchStart  = (event:TouchEvent) =>{
        var te=event.touches[0];  
        if (this.draggerProps.onDragStart){
            this.draggerProps.onDragStart(te.clientX, te.clientY);
        }
    }
    
    onResizeStart = (event:MouseEvent) =>{
        if (this.draggerProps.onDragStart){
            this.draggerProps.onDragStart(event.clientX, event.clientY);
        }
    }
    
    RenderSelf(self:HTMLElement) {
        self.onmousedown = this.onResizeStart;
        self.ontouchstart = this.onTouchStart;
    }
}