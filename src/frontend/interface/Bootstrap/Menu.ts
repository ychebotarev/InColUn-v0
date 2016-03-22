import {DomContainer} from '../../core/DomContainer';

export class Menu extends DomContainer{
    constructor(cn:string){
        super({tag:'ul',className:cn,attributes: {role:'menu'}  });
    }
}
