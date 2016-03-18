import {DomElementProps} from './DomElementProps';

class DOM{
    public static CreateFromProps(props:DomElementProps):HTMLElement{
        return DOM.Create(props.tag, props.className, props.style, props.attributes);
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
}

export {DOM};