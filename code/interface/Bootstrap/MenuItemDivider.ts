import {DomElement} from '../../core/DomElement';

export class MenuItemDivider extends DomElement{
    constructor(){
        super({tag:'li', className:'divider'});
    }
}

export function RenderNavBarMenuItemDivider(renderTo:HTMLElement){
    var element = new MenuItemDivider();
    element.Render(renderTo);
}
