import { Component, OnInit, AfterViewInit } from '@angular/core';
// import * as ChessBoard from '@chrisoakman/chessboardjs';

// declare ChessBoard here
declare var ChessBoard: any;

@Component({
  selector: 'app-chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.css']
})
export class ChessboardComponent implements OnInit {

  title = 'frontend';
  board: any;

  constructor() { }

  ngOnInit(): void {
    this.board = ChessBoard('board1', {
      position: 'start',
      draggable:true,
      sparePieces: true,
      dropOffBoard: 'snapback',
      moveSpeed: 'slow',
      snapbackSpeed:500,
      snapSpeed: 100
    });
  }


  // ngAfterViewInit() {
  //   this.board1 = ChessBoard('board1', {
  //     draggable: true,
  //     pieceTheme: 'node_modules/chessboardjs/www/img/chesspieces/wikipedia/{piece}.png'
  //   });
  // }
}
