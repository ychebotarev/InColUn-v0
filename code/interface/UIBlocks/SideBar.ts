import {DOM} from '../../lib/dom';
import {classNames} from '../../lib/classNames';
import {DomElementBase} from '../../core/DomElementBase';
import {Menu} from '../bootstrap/Menu'
import {MenuItemLink} from '../bootstrap/MenuItemLink'

export class SideBar extends DomElementBase{
    
    constructor(){
        super({tag : 'div', className : classNames('navbar-collapse','collapse')});
    }
    
    protected RenderSelf(renderTo:HTMLElement){
        
    }
}

