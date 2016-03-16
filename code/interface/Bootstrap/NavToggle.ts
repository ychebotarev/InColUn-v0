import {DomElement} from '../../core/DomElement';
import {classNames} from '../../lib/classNames';

class NavToggle extends DomElement{
    private content: HTMLElement;
    private domBox:HTMLElement;
    
    public constructor(){
        super();
        this.tag = 'button';
        this.className = classNames('navbar-toggle','collapsed'); 
        this.attributes = {
            'type':'button',
            'data-toggle':'collapse',
            'data-target':"#bs-example-navbar-collapse-1",
            'aria-expanded':"false"
        }
    }
    
    public RenderSelf(self:HTMLElement){
    }
}

export {NavToggle} 