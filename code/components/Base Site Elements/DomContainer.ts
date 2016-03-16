import {DomElement} from '../DomElement';

class DomContainer extends DomElement{
    children:DomElement[];
    public AddChild(child:DomElement){
        this.children.push(child);
    }
}

export {DomContainer}