import {Dom} from '../core/dom'
import {DomElement} from '../core/DomElement';
import {DocumentProps} from './DocumentProps'
import {application} from '../App';

export class BoardInfo extends DomElement{
    private docProps:DocumentProps;
    
    constructor(docProps:DocumentProps){
        super({tag:'div', className:'board-item'});
        this.docProps = docProps;
    }
    
    Guid():string{
        return this.docProps.guid;
    }
    
	Title():string{
        return this.docProps.title;
    }
    
	protected RenderSelf(self:HTMLElement){
		self.innerText=this.Title();
        self.onclick = (ev:MouseEvent) => { application.OnCommand({command:'OpenBoard', param1:{guid:this.Guid()}})};
    }
}