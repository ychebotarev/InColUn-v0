import {App} from './components/App';
import {Board} from './components/Board';

var app = App.CreateApp(document.getElementById('app')); 
var board = new Board();
app.AddBoard(board);
app.Render();