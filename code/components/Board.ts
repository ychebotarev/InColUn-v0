import {DomElementBase} from '../core/DomElementBase';
import {DocumentProps} from './DocumentProps'
import {Section} from './Section';

class Board extends DomElementBase{
    private sections: {[key:string]:Section};
    private activeSectionId:string;
    
    constructor(){
        super({tag:'div'});
    }
    
    public getID():string{
        return 'test';
    }
    
    public AddSection(section:Section){
        this.sections[section.id] = section;
    }
    
    protected RenderSelf(self:HTMLElement){
        var activePage = this.sections[this.activeSectionId];
        if (activePage != undefined)
            var pageElement = activePage.Render(self);
    }
}

export {Board}