// From http://eloquentjavascript.net/appendix2.html, 

class BinaryHeap<T>{
	scoreFunction:(element:T)=>number;
	content:T[];
	
	constructor(scoreFunction){
		this.scoreFunction = scoreFunction;
	}
	
	public clone(){
		var heap = new BinaryHeap<T>(this.scoreFunction);
		heap.content = JSON.parse(JSON.stringify(this.content));
		return heap;
	}
	
	public push(element:T){
		this.content.push(element);
		this.bubbleUp(this.content.length - 1);
	}
	
	public peek():T{
		return this.content[0]; 
	}
	
	public pop(){
		var result = this.content[0];
		var end = this.content.pop();
		if (this.content.length > 0) {
			this.content[0] = end;
			this.sinkDown(0);
		}
		return result;
	}
	
	public remove(node:T){
		var len = this.content.length;
		for (var i = 0; i < len; i++) {
			if (this.content[i] == node) {
				var end = this.content.pop();
				if (i != len - 1) {
					this.content[i] = end;
					
					if (this.scoreFunction(end) < this.scoreFunction(node))
						this.bubbleUp(i);
					else
						this.sinkDown(i);
				}
				return false;
			}
		}
		
		return false;
	}
	
	public size():number{
		return this.content.length;
	}
	
	private bubbleUp(n:number){
		var element = this.content[n];
		while (n > 0) {
			var parentN = Math.floor((n + 1) / 2) - 1,
			parent = this.content[parentN];
			if (this.scoreFunction(element) < this.scoreFunction(parent)) {
				this.content[parentN] = element;
				this.content[n] = parent;
				// Update 'n' to continue at the new position.
				n = parentN;
			}
			else {
				break;
			}
		}
	} 
	
	private sinkDown(n:number){
		var length = this.content.length,
			element = this.content[n],
			elemScore = this.scoreFunction(element);
		
		while(true) {
			var child2N = (n + 1) * 2, child1N = child2N - 1;
			var swap = null;
			if (child1N >= length)
					break;
			var child1 = this.content[child1N],
				child1Score = this.scoreFunction(child1);
			
			if (child1Score < elemScore) 
				swap = child1N;
			
			if (child2N < length) {
				var child2 = this.content[child2N],
				child2Score = this.scoreFunction(child2);
				if (child2Score < (swap == null ? elemScore : child1Score))
					swap = child2N;
			}
			
			if (swap == null)
				break;
			
			this.content[n] = this.content[swap];
			this.content[swap] = element;
			n = swap;
		}
	} 
}

export {BinaryHeap}