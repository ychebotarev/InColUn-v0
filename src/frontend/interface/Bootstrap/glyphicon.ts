import {DomElement} from '../../core/DomElement';
import {classNames} from '../../lib/classNames';

export class GlyphIcon extends DomElement{
    constructor(icon:string){
        super({tag : 'span', className : classNames('glyphicon', 'glyphicon-'+icon)});
    }
}

export function RenderGlyphIcon(icon:string, renderTo:HTMLElement){
    var glyphIcon = new GlyphIcon(icon);
    glyphIcon.Render(renderTo);
}