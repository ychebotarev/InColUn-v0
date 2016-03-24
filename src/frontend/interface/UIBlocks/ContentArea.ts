import {Dom} from '../../core/dom'
import {Box} from '../../components/Box'
import {UIElement} from '../../core/UIElement'


export class ContentArea extends UIElement{
    protected CreateDom():HTMLElement{
        var canvas = Dom.div('hello-world');
        return canvas;
    }
    
    protected RenderSelf(self:HTMLElement){
        var box1 = new Box({guid:'box1'}, {x:100,y:100,w:200,h:300});
        box1.Render(self);

        var box2 = new Box({guid:'box2'},{x:160,y:300,w:200,h:150});
        box2.Render(self);
    }
} 