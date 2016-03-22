import {DomElement} from '../core/DomElement';
import {DocumentProps} from './DocumentProps'

export class BoardInfo extends DomElement{
    private docProps:DocumentProps;
    
    constructor(docProps:DocumentProps){
        super({tag:'div'});
        this.docProps = docProps;
    }
    
    getGuid():string{
        return this.docProps.guid;
    }
    
}