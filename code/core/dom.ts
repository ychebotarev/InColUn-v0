import {DomElementProps} from './DomElementProps';

class Dom{
    public static CreateFromProps(props:DomElementProps):HTMLElement{
        return Dom.Create(props.tag, props.className, props.style, props.attributes);
    }
    
    public static Create(tag:string, className?:string, style?: {}, attributes?:{}):HTMLElement{
        var element = document.createElement(tag);
        if (className){
            element.className = className;
        }
        if (attributes){
            for(var attrName in attributes){
                if(attrName == 'style'){
                    var style_attr = attributes['style'];
                    for(var styleName in style_attr){
                        element.style[styleName]=style_attr[styleName];
                    }
                }
                else{
                    element.setAttribute(attrName, attributes[attrName]);
                }
            }
        }
        
        if(style){
            for(var styleName in style){
                element.style[styleName]=style[styleName];
            }            
        }
        return element;
    }
    
    public static element(tag:string, className?:string, style?: {}, attributes?:{}):HTMLElement{
        return Dom.Create(tag, className, style, attributes);
    }
    
    public static a(className?:string, style?: {}, attributes?:{}):HTMLAnchorElement{
        return <HTMLAnchorElement>Dom.Create('a', className, style, attributes);
    }
    
    public static div(className?:string, style?: {}, attributes?:{}):HTMLElement{
        return Dom.Create('div', className, style, attributes);
    }
    
    public static ul(className?:string, style?: {}, attributes?:{}):HTMLElement{
        return Dom.Create('ul', className, style, attributes);
    }
    public static li(className?:string, style?: {}, attributes?:{}):HTMLElement{
        return Dom.Create('li', className, style, attributes);
    }
    
    public static text(content:string, tag:string,className?:string, style?: {}, attributes?:{}):HTMLElement{
        var el = Dom.Create(tag, className, style, attributes);
        el.innerText = content;
        return el;
    }
}


export {Dom};