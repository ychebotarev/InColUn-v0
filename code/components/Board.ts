import {DocumentProps} from './DocumentProps'
import {Section} from './Section';

class Board {
    private sections: {[key:string]:Section};
    private activeSectionId:string;
    props:DocumentProps;
    
    constructor(props:DocumentProps){
        this.props = props;
    }
    
    public getID():string{
        return 'test';
    }
    
    public AddSection(section:Section){
        this.sections[section.id] = section;
    }    
}

export {Board}