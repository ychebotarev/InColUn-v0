import {DOM} from '../utils/DOM'; 
import {Section} from './Section';
import {DomElement} from './DomElement';

export class Board implements DomElement{
    private sections: {[key:string]:Section};
    private activeSectionId:string;
    public AddPage(page:Section){
        //this.pages[page.id] = page;
    }
    
    public Render(renderTarget:DocumentFragment){
        var root = DOM.Create("div");
        
        var activePage = this.sections[this.activeSectionId];
        if (activePage != undefined){
            activePage.Render(root);    
        }        
    }
}