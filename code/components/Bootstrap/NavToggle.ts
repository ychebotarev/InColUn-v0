import {DOM} from '../../utils/DOM';
import {DomElement} from '../DomElement';
import {classNames} from '../../utils/classNames';

class NavToggle implements DomElement{
    private content: HTMLElement;
    private domBox:HTMLElement;
    
    public constructor(){
    }
    
    public Render(container:HTMLElement){
        var attribute= {
            type:'button',
            class:classNames('navbar-toggle','collapsed'),
            'data-toggle':'collapse',
            'data-target':"#bs-example-navbar-collapse-1",
            'aria-expanded':"false"
        }
        this.domBox = DOM.Create("button", attribute);
    }
}

export {NavToggle} 