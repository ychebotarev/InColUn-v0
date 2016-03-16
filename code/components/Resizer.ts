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
    private props:RisizerProps;
    
    constructor(props) {
        super();
        this.props = props;
        this.style = this.getStyle();
        this.className = this.getClass();  
    }
    
    onTouchStart  = (event:TouchEvent) =>{
        var te=event.touches[0];  
        this.props.onResizeStart(te.clientX, te.clientY);
    }
    
    onResizeStart = (event:MouseEvent) =>{
        this.props.onResizeStart(event.clientX, event.clientY);
    }
    
    getClass():string {
        switch(this.props.type){
            case ResizeType.Horz:
                return 'resizer_horz';
            case ResizeType.Vert:
                return 'resizer_vert';
            case ResizeType.Both:
                return 'resizer_both';
        }
    }
  
    getStyle():any{
        if(this.props.type === ResizeType.Horz)
            return {
                width: '10px',
                height: '100%',
                position: 'absolute',
                top: '0',
                right: '-5px',
                cursor: 'col-resize'
            }; 
        if(this.props.type === ResizeType.Vert)
            return {
                width: '100%',
                height: '10px',
                position: 'absolute',
                bottom : '-5px',
                cursor: 'row-resize'
            }; 
        if(this.props.type === ResizeType.Both)
            return {
                width: '10px',
                height: '10px',
                position: 'absolute',
                right : '-5px',
                bottom: '-5px',
                cursor: 'nw-resize'
            }; 
    }

    RenderSelf(self:HTMLElement) {
        self.onmousedown = this.onResizeStart;
        self.ontouchstart = this.onTouchStart;
    }
}
