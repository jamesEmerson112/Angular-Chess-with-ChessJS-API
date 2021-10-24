import { Component, OnInit } from '@angular/core';

// declare variables
// var board = null
// var game = new Chess()
declare var ChessBoard: any;


@Component({
  selector: 'app-chess-game',
  templateUrl: './chess-game.component.html',
  styleUrls: ['./chess-game.component.css']
})
export class ChessGameComponent implements OnInit {

  canEdit = false;
  board: any;

  constructor() { }

  ngOnInit(): void {
  }

  onEditClick(): void {
    this.canEdit = !this.canEdit;
    if (this.canEdit){
      this.board = ChessBoard(
        'board1',
        {
          position: 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R',
          draggable:true,
          sparePieces: false,
          dropOffBoard: 'snapback',
          moveSpeed: 'slow',
          snapbackSpeed:500,
          snapSpeed: 100
        }
      )
    }
    else{
      this.board = ChessBoard('board1',
      {
        position: 'start',
        draggable:true,
        sparePieces: false,
        dropOffBoard: 'snapback',
        moveSpeed: 'slow',
        snapbackSpeed:500,
        snapSpeed: 100
      });
    }
  }

}
