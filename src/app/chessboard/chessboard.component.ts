import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as $ from "jquery";      // same as declare var $: any;
import { Chess } from "chess.js";
// import * as ChessBoard from '@chrisoakman/chessboardjs';
// import {ChessboardService} from '';

// declare ChessBoard here
declare var ChessBoard: any;
declare var Position: [];
// declare var Chess:any;
// const chess = new Chess();

@Component({
  selector: 'app-chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.css']
})

export class ChessboardComponent implements OnInit {

  title = 'frontend';
  board: any;
  canEdit = false;

  // test LEGAL MOVES
  // VARIABLE
  boardLegalMove: any = null;
  // game = Chess();          // this causes errors for some reasons
  $status = $('#status');
  $fen = $('#fen')
  $pgn = $('#pgn')

  config = {
    position: 'start',
    draggable: true,
    // sparePieces: true,
    dropOffBoard: 'snapback',
    moveSpeed: 'slow',
    snapbackSpeed:500,
    snapSpeed: 100,
    // onDragStart: this.onDragStart,
    // onDrop: this.onDrop,
    // onSnapEnd: this.onSnapEnd
  }

  constructor() { }

  ngOnInit(): void {
    this.board = ChessBoard('board1', this.config);
    // while(true)
    // {
      // this.updateStatus();
    // }
    // setTimeout(() => { this.updateStatus();}, 5000);
    // setTimeout(() => { this.test();}, 5000);
    $('button').click(function() {
      alert('Hey testing jquery!');
    })
  }

  // // test LEGAL MOVES
  // // FUNCTIONS
  // onDragStart(source: any, piece: any, position: any, orientation: any) {
  //   // do not pick up pieces if the game is over
  //   console.log(this.game.game_over())
  //   if (this.game.game_over())
  //     return false;
    
  //   // only pick up pieces for the side to move
  //   if((this.game.turn() == 'w' && piece.search(/^b/) != -1) ||
  //   (this.game.turn() == 'b' && piece.search(/^w/) != -1))
  //   {
  //     return false;
  //   }
  //   return true;
  // };

  // onDrop (source:any, target:any){
  //   // see if the move is legal
  //   let move = this.game.move(
  //     {
  //       from: source,
  //       to: target,
  //       promotion: 'q'  // Note: always promote to a queen for example simplicity
  //     }
  //   )

  //   // illegal move
  //   if (move === null) return 'snapback'

  //   this.updateStatus();

  //   return;
  // }

  // // update the board position after the piece snap
  // // for castling, en passant, pawn promotion
  // onSnapEnd() {
  //   this.board.position(this.game.fen());
  // }

  // updateStatus() {
  //   let status = '';
    
  //   let moveColor = 'White';
  //   if (this.game.turn() === 'b')
  //   {
  //     moveColor = 'Black'
  //   }

  //   // checkmate?
  //   if (this.game.in_checkmate())
  //   {
  //     status = 'Game over, ' + moveColor + ' is in checkmate'
  //   }

  //   // draw?
  //   else if (this.game.in_draw()) 
  //   {
  //     status = 'Game over, drawn position'
  //   }

  //   else
  //   {
  //     status = moveColor + ' to move'

  //     // check?
  //     if(this.game.in_check())
  //     {
  //       status += ', ' + moveColor + ' is in check'
  //     }
  //   }

  //   this.$status.html(status)
  //   this.$fen.html(this.game.fen())
  //   this.$pgn.html(this.game.pgn())
  // }
  
}
