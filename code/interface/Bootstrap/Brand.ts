import {DomElement} from '../../core/DomElement';
import {classNames} from '../../lib/classNames';

class BootstrapBrand extends DomElement{
    constructor(){
        super();
        this.tag = 'button';
        this.className = classNames('navbar-brand'); 
        this.attributes = {
            'data-toggle':'collapse',
            'data-target':"#bs-example-navbar-collapse-1",
            'aria-expanded':"false"
        }
    }
    
    protected RenderSelf(self:HTMLElement){
    }
}

export {BootstrapBrand}