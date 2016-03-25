abstract class UIElement {
    constructor(){
    }
    
    protected self:HTMLElement;

    protected CreateDom(){
        this.self = this.CreateDomImpl();
    }
    
    protected abstract CreateDomImpl():HTMLElement;
    protected abstract RenderSelf();
    
    public Render(renderTo:HTMLElement){
        this.CreateDom();
        if(!this.self){
            return undefined;
        }
        
        this.RenderSelf();
        
        if (renderTo){
            renderTo.appendChild(this.self);
        }
    }    
}

export {UIElement}