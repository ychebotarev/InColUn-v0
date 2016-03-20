import {CommandInfo} from '../../core/CommandInfo'
 
export interface TreeNodeInfo{
    title:string;
    guid:string;
    command?:CommandInfo;
} 
 
export interface TreeNodeData{
    info:TreeNodeInfo
    subNodes?:TreeNodeData[];
}