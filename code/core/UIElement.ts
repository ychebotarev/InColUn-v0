abstract class UIElement {
    constructor(){
    }

    protected abstract RenderSelf(self:HTMLElement);
    protected abstract CreateDom():HTMLElement;
    
    public Render(renderTo:HTMLElement):HTMLElement{
        var element = this.CreateDom();
        
        this.RenderSelf(element);
        
        if(!element){
            return undefined;
        }
        if (renderTo){
            renderTo.appendChild(element);
        }
        
        return element;
    }    
}

export {UIElement}