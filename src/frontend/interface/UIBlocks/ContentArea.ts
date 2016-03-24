import {Dom} from '../../core/dom'
import {UIElement} from '../../core/UIElement'
import {BoxDimentions, Box} from '../../components/Box'

export class ContentArea extends UIElement{
    private activeBox:Box;
    private boxes:{[key:string]:Box};
    
    constructor(){
        super();
        this.boxes = {};
        
        let onBoxActivated = (guid:string) => { this.OnBoxActivated(guid);}
        let onBoxDeactivated = (guid:string) => { this.OnBoxDeactivated(guid);}
        let onBoxSizeChanged = (guid:string, dimentions:BoxDimentions) => { this.OnBoxSizeChanged(guid, dimentions);}
        let onBoxContentChanged = (guid:string) => { this.OnBoxContentChanged(guid)}
        
        for(var i:number = 0; i< 10; ++i){
            this.boxes['box1'+String(i)] = new Box({
                dimention:{x:100+10*i,y:100+15*i,w:200,h:300}, 
                info:{guid:'box1'+String(i)},
                callbacks:{
                    boxActivated: onBoxActivated,
                    boxDeactivated: onBoxDeactivated,
                    sizeChanged: onBoxSizeChanged,
                    contentChanged: onBoxContentChanged}});
        }

        this.boxes['box2'] = new Box({
            dimention:{x:100,y:300,w:220,h:130}, 
            info:{guid:'box2'},
            callbacks:{
                boxActivated: onBoxActivated,
                boxDeactivated: onBoxDeactivated,
                sizeChanged:onBoxSizeChanged,
                contentChanged:onBoxContentChanged}});
    }
    
    protected CreateDom():HTMLElement{
        var canvas = Dom.div('content-area');
        return canvas;
    }
    
    private OnBoxActivated(guid:string){
    }
    private OnBoxDeactivated(guid:string){
    }
    
    private OnBoxSizeChanged(guid:string, dimentions:BoxDimentions){
    }
    
    private OnBoxContentChanged(guid:string){
        
    }

    protected RenderSelf(self:HTMLElement){
        for(var guid in this.boxes){
            this.boxes[guid].Render(self);
        }
    }
} 