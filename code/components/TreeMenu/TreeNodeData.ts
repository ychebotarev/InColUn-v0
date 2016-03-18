import {CommandInfo} from '../../core/CommandInfo'
 
export interface TreeNodeInfo{
    title:string;
    command?:CommandInfo;
} 
 
export interface TreeNodeData{
    info:TreeNodeInfo
    subNodes?:TreeNodeData[];
}