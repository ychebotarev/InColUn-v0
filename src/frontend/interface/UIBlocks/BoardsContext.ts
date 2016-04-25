/// <reference path='../../../../typings/tsd.d.ts' />
import {Dom} from '../../core/dom'
import {UIElement} from '../../core/UIElement'
import {BoardInfo} from '../../components/BoardInfo'

export class BoardsContext extends UIElement {
	isLoading: boolean;
    boardsInfo: { [key: string]: BoardInfo };

    constructor() {
		super();
		this.isLoading = false;
		this.boardsInfo = {};
		this.createFakeBoards();
	}

	public LoadBoards() {
		this.isLoading = true;
		$.ajax('/api/boards', {
			type: 'GET',
			data: {},
			dataType: 'json',
			success: (data: any, textStatus: string, jqXHR: JQueryXHR) => { this.OnBoardsLoaded(data, textStatus, jqXHR) }
		});
	}

	protected CreateDomImpl(): HTMLElement {
		var container = Dom.div('board-container');

		//create title

		//create toolbar

		return container;
	}

    protected RenderSelf() {
		if (this.isLoading) {
			this.RenderLoadingState(this.self);
		}
		else {
			this.RenderBoards(this.self);
		}
    }

	private OnBoardsLoaded(data: any, textStatus: string, jqXHR: JQueryXHR) {
		this.isLoading = false;
		this.boardsInfo={}
		if(data.boards && data.boards.length > 0){
			data.boards.forEach(doc => { this.boardsInfo[doc.guid] = new BoardInfo(doc) });
		}
		this.self.innerHTML='';
		this.RenderSelf();
	}

	private RenderBoards(self: HTMLElement) {
		var spinner = Dom.GetElementByClassName(this.self, 'boards-spinner');
		if (spinner) {
			Dom.Hide(spinner);
		}

		var add_board = Dom.div('board-item add-board');
		var add_board_icon = Dom.Create('i');
		add_board_icon.innerText = '+';
		add_board.appendChild(add_board_icon);
		self.appendChild(add_board);

		for (var key in this.boardsInfo) {
			this.boardsInfo[key].Render(self);
		}
	}

	private RenderLoadingState(self: HTMLElement) {
		var spinner = Dom.GetElementByClassName(self, 'boards-spinner');
		if (spinner) {
			Dom.Show(spinner);
			return;
		}
		var holder = Dom.div('boards-spinner centered-box');
		var outer_ball = Dom.div('spinning_ball outer_ball');
		var inner_ball = Dom.div('spinning_ball inner_ball');
		holder.appendChild(outer_ball);
		holder.appendChild(inner_ball);
		self.appendChild(holder);
	}

	private createFakeBoards() {
		var docInfo = [
			{
				title: 'Statistic and machine learning',
				guid: 'eec39f91-8ae2-4023-b3f8-694a9561b8d5',
				created: new Date(2016, 4, 4, 18, 31, 54),
				modified: new Date(2016, 4, 4, 18, 31, 54),
				timestamp: 'AAAA'
			},
			{
				title: 'Misc',
				guid: 'c3cb42ff-699b-499c-bbb7-9adc722cfbc9',
				created: new Date(2016, 4, 4, 18, 31, 54),
				modified: new Date(2016, 4, 4, 18, 32, 54),
				timestamp: 'BBBB'
			},
			{
					title: 'Javascript',
				guid: '29147c3e-c190-450f-bdca-cff5077a08b4',
				created: new Date(2016, 4, 4, 18, 31, 54),
				modified: new Date(2016, 4, 4, 19, 31, 54),
				timestamp: 'CCC'
			},
			{
				title:'Really really really really really long long long tiiiiiiitle', 
				guid:'29147c3e-c190-450f-bdca-cff5077a08b5',
				created: new Date(2016,4,4,12,31,54),
				modified: new Date(2016,4,4,13,31,54),
				timestamp:'DDD'
			},
			{
				title:'Javascript on UX', 
				guid:'29147c3e-c190-450f-bdca-cff5077a08b6',
				created: new Date(2016,4,4,11,31,54),
				modified: new Date(2016,4,4,16,31,54),
				timestamp:'EEE'
			}
		]

		docInfo.forEach(doc => { this.boardsInfo[doc.guid] = new BoardInfo(doc) });
	}
}