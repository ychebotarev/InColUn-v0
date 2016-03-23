import {Dom} from '../../core/dom'
import {Box} from '../../components/Box'
import {UIElement} from '../../core/UIElement'


export class ContentArea extends UIElement{
    protected CreateDom():HTMLElement{
        return Dom.div();
    }
    
    protected RenderSelf(self:HTMLElement){
        var box = new Box({x:100,y:100,w:200,h:300});
        box.Render(self);
    }
} 