import {DOM} from '../utils/dom';

export enum ResizeType{
    Horz,
    Vert,
    Both
}

export class RisizerProps{
    onResizeStart:(clientX:number, clientY:number)=>void;
    type:ResizeType;
}

export class Resizer{
    private props:RisizerProps;
    constructor(props) {
        this.props = props;
    }
    
    onTouchStart  = (event:TouchEvent) =>{
        var te=event.touches[0];  
        this.props.onResizeStart(te.clientX, te.clientY);
    }
    
    onResizeStart = (event:MouseEvent) =>{
        this.props.onResizeStart(event.clientX, event.clientY);
    }
    
    getClass(){
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

    Render(container:HTMLElement) {
        var style=this.getStyle();
        var r = DOM.Create("div");//,{"style" = style});
        r.onmousedown = this.onResizeStart;
        r.ontouchstart = this.onTouchStart;
    }
}
