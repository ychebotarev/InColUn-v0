import {DomContainer} from '../../core/DomContainer';
import {DomElement} from '../../core/DomElement';
import {Menu} from '../bootstrap/Menu'
import {MenuItemLink} from '../bootstrap/MenuItemLink'
import {MenuItemDivider} from '../bootstrap/MenuItemDivider'
import {GlyphIcon} from '../bootstrap/glyphicon'
import {DomElementText} from '../../core/DomElementText';

export class NavbarSearch extends DomContainer{
    constructor(){
        super( { tag : 'div',  className : 'col-sm-4 col-md-4 navbar-right'});
        var searchForm = new DomContainer({tag:'form', className:'navbar-form', attributes : {role:'search'}});
        this.AddChild(searchForm);
        
        var inputGroup = new DomContainer({ tag:'div',className : 'input-group'});
            var div_search_panel = new DomContainer({ tag:'div',className : 'input-group-btn search-panel'});
                var button = new DomContainer({ 
                        tag:'button'
                        ,className : 'btn btn-default dropdown-toggle'
                        ,attributes:{
                            type:"button",
                            'data-toggle':"dropdown"    
                }});
                    button.AddChild(new DomElementText('Search in',{tag:'span', attributes:{id:'search_concept'}} ));
                    button.AddChild(new DomElement({tag:'span', className:'caret'}) );
            div_search_panel.AddChild(button);
        
                var menu = new Menu("dropdown-menu");
                    menu.AddChild(new MenuItemLink({ commandInfo:{ command:"SearchOptionMyBoards"}, title:'My Boards'}));
                    menu.AddChild(new MenuItemLink({ commandInfo:{ command:"SearchOptionMyBoards"}, title:'Shared Boards'}));
                    menu.AddChild(new MenuItemDivider());
                    menu.AddChild(new MenuItemLink({ commandInfo:{ command:"SearchOptionMyBoards"}, title:'Public Boards'}));
            div_search_panel.AddChild(menu);
        inputGroup.AddChild(div_search_panel);
        
        inputGroup.AddChild(new DomElement({tag:'input', className:'form-control', attributes:{
            type:'text',
            placeholder:'Search',
            name:'q'
        }}));
        
        var search_div_group = new DomContainer({tag:'div', className:'input-group-btn'});
            var search_button = new DomContainer({tag:'button', className:'btn btn-default', attributes:{
                type:'submit'
            }});
            search_button.AddChild(new GlyphIcon('search'));
            search_div_group.AddChild(search_button);
            
        inputGroup.AddChild(search_div_group);
            
        searchForm.AddChild(inputGroup);
    }
}

export function RenderNavbarSearch(renderTo:HTMLElement){
    var element = new NavbarSearch();
    element.Render(renderTo);
}
