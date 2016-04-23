declare class BinaryHeap{
    constructor(scoreFunction:any);
    
    public clone();
    public push(element:any)
    public peek():any;
    public pop();
    public remove():boolear;
    public size():number;
    
    public bubbleUp(n:number);
    public sinkDown(n:number);
}


declare class Counter{
	public inc(val:number);
    public dec(val:number);
    public clear();
    public printObj()
}

declare class Histogram{
	public clear();
}
    
declare module "medium-editor" {
    export = MediumEditor;
}

    