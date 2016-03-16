import {DOM} from '../../utils/DOM';
import {DomElement} from '../DomElement';
import {classNames} from '../../utils/classNames';

class BootStrapBrand implements DomElement{
    public Render(container:HTMLElement){
        var attributes= {
            class:classNames('navbar-brand'),
            'data-toggle':'collapse',
            'data-target':"#bs-example-navbar-collapse-1",
            'aria-expanded':"false"
        }
        var brand = DOM.Create("button", attributes);
        
        container.appendChild(brand);
    }
    
}