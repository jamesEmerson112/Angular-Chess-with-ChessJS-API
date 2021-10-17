import { Component, OnInit, AfterViewInit } from '@angular/core';
// import * as ChessBoard from '@chrisoakman/chessboardjs';

@Component({
  selector: 'app-chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.css']
})
export class ChessboardComponent implements AfterViewInit {

  title = 'frontend';
  board1: ChessBoard;

  constructor() { }

  // ngOnInit(): void {
  // }


  ngAfterViewInit() {
    this.board1 = ChessBoard('board1', {
      draggable: true,
      pieceTheme: 'node_modules/chessboardjs/www/img/chesspieces/wikipedia/{piece}.png'
    });
  }
}
