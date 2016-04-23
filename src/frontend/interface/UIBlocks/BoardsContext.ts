/// <reference path='../../../../typings/tsd.d.ts' />
import {Dom} from '../../core/dom'
import {DomElement} from '../../core/DomElement';
import {BoardInfo} from '../../components/BoardInfo'

export class BoardsContext extends DomElement{
	isLoading:boolean;
    boardsInfo:{[key:string]:BoardInfo};
	
	
    constructor(){
        super({tag:'div', className : 'BoardsContext'});
    	this.isLoading:false;
	}
	
	public loadBoards(){
		this.isLoading = true;
		$.ajax('/auth/facebook', {
			type     : 'GET', 
			url      : '/api/boards', 
			data     : {}, 
			dataType : 'json',
			success  : (data: any, textStatus: string, jqXHR: JQueryXHR) => {this.OnBoardsLoaded(data, textStatus, jqXHR)}
		});  
	}
	
	private OnBoardsLoaded(data: any, textStatus: string, jqXHR: JQueryXHR){
		this.isLoading = false;
	}
	
    protected RenderSelf(self:HTMLElement){
		if(this.isLoading){
			this.RenderLoadingState(self);
		}
		else{
			this.RenderBoards(self);
		}        
    }
	
	private RenderBoards(self:HTMLElement){
		var board_container = Dom.div('board-container'); 
        	var add_board=Dom.div('board-item add-board');
			board_container.appendChild(board_container);
			
			for(var key in this.boardsInfo){
            	this.boardsInfo[key].Render(board_container);
        	}
		self.appendChild(board_container);
	}
	
	private RenderLoadingState(self:HTMLElement){
		var holder=Dom.div('centered-box');
			var outer_ball = Dom.div('spinning_ball outer_ball');
			var inner_ball = Dom.div('spinning_ball inner_ball');
			holder.appendChild(outer_ball);
			holder.appendChild(inner_ball);
		self.appendChild(holder);
	}
}