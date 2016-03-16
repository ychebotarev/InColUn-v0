import {DomElement} from '../core/DomElement';
import {BoardProps} from './BoardProps'

export class BoardInfo extends DomElement{
    private props:BoardProps;
    
    constructor(props:BoardProps){
        super();
        this.props = props;
        this.tag = 'div'
    }
    
    getGuid():string{
        return this.props.guid;
    }
    
    protected RenderSelf(self: HTMLElement){
        
    }    
}