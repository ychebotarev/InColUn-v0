import {DOM} from '../utils/DOM'; 
import {DomElement} from './DomElement';

export class BoardInfoProps{
    title:string;
    guid:string;
    created:Date;
    modified:Date;
    timestamp:string;
}

export class BoardInfo implements DomElement{
    private props:BoardInfoProps;
    
    constructor(props:BoardInfoProps){
        this.props = props;
    }
    
    Render(renderTarget:DocumentFragment){
        var element = DOM.Create("div");
        renderTarget.appendChild(element);
    }
        
}