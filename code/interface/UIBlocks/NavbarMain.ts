import {DOM} from '../../lib/dom';
import {classNames} from '../../lib/classNames';
import {DomElementBase} from '../../core/DomElementBase';
import {Menu} from '../bootstrap/Menu'
import {MenuItemLink} from '../bootstrap/MenuItemLink'
import {NavbarSearch} from './NavbarSearch';

export class NavbarMain extends DomElementBase{
    constructor(class_name:string){
        super({tag : 'div', className : classNames('navbar-collapse','collapse')});
    }
    
    protected RenderSelf(renderTo:HTMLElement){

        var navbarMenu = new Menu(classNames(['nav','navbar-nav']));
        navbarMenu.AddChild( new MenuItemLink({ commandInfo:{command:'cmdHome'}, icon:'home' }));
        navbarMenu.AddChild( new MenuItemLink({ commandInfo:{command:'cmdUnknown'},title:'Link'}));

        navbarMenu.Render(renderTo);
        
        var navSearch = new NavbarSearch();
        
        navSearch.Render(renderTo);
    }
}

export function RenderNavbarMain(class_name:string, renderTo:HTMLElement){
    var navbarMain = new NavbarMain(class_name);
    navbarMain.Render(renderTo);
} 
