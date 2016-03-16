class DOM{
    public static Create(tag:string, attributes?:any):HTMLElement{
        var el = document.createElement(tag);
        if (attributes === undefined){
            return el;
        }
        for(var attrName in attributes){
            if(attrName == 'style'){
                var style = attributes['style'];
                for(var styleName in style){
                    el.style[styleName]=style[styleName];
                }
            }
            else{
                el.setAttribute(attrName, attributes[attrName]);
            }
        }
        return el;    
    }
}

export {DOM};