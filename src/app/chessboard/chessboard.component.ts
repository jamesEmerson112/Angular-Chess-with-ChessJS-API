import { Component, OnInit, AfterViewInit } from '@angular/core';
// import * as ChessBoard from '@chrisoakman/chessboardjs';
// import {ChessboardService} from '';

// declare ChessBoard here
declare var ChessBoard: any;
declare var Position: [];

@Component({
  selector: 'app-chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.css']
})
export class ChessboardComponent implements OnInit {

  title = 'frontend';
  board: any;
  canEdit = false;

  constructor() { }

  ngOnInit(): void {
    this.board = ChessBoard('board1', {
      position: 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R',
      draggable:true,
      sparePieces: true,
      dropOffBoard: 'snapback',
      moveSpeed: 'slow',
      snapbackSpeed:500,
      snapSpeed: 100
    });
  }

  onEditClick(): void {
    this.canEdit = !this.canEdit;
    if (this.canEdit){
      this.board = ChessBoard(
        'board1',
        {
          position: 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R',
          draggable:true,
          sparePieces: true,
          dropOffBoard: 'snapback',
          moveSpeed: 'slow',
          snapbackSpeed:500,
          snapSpeed: 100
        }
      )
    }
  }
  
  // ngAfterViewInit() {
  //   this.board1 = ChessBoard('board1', {
  //     draggable: true,
  //     pieceTheme: 'node_modules/chessboardjs/www/img/chesspieces/wikipedia/{piece}.png'
  //   });
  // }
}
