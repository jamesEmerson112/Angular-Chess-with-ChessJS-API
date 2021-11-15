import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as ChessJS from 'chess.js';
import * as $ from "jquery";      // same as declare var $: any;
import {ChessboardService} from '../chessboard.service';


// declare ChessBoard here
// declare var ChessBoard: any;
// const Chess = typeof ChessJS === "function" ? ChessJS : ChessJS.Chess;

@Component({
  selector: 'app-chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.css']
})

export class ChessboardComponent implements OnInit{

  title = 'frontend';
  board: any;

  // // test LEGAL MOVES
  // // VARIABLE
  // boardLegalMove: any = null;
  // game = new Chess();


  // config = {
  //   position: 'start',
  //   draggable: true,
  //   // sparePieces: true,
  //   dropOffBoard: 'snapback',
  //   moveSpeed: 'slow',
  //   snapbackSpeed:500,
  //   snapSpeed: 100,
  //   onDragStart: this.onDragStart.bind(this),
  //   onDrop: this.onDrop.bind(this),
  //   onSnapEnd: this.onSnapEnd.bind(this)
  // }

  // constructor() { }

  // ngOnInit(): void {
  //   this.board = ChessBoard('board1', this.config);
  //   setTimeout(() => { this.updateStatus.bind(this);}, 5000);
  //   // setTimeout(() => { this.test();}, 5000);
  // }
  
  // // // FUNCTIONS
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

  // // // update the board position after the piece snap
  // // // for castling, en passant, pawn promotion
  // onSnapEnd() {
  //   this.board.position(this.game.fen());
  // }

  // updateStatus() {
  //   let statusTemp = '';
    
  //   let moveColor = 'White';
  //   if (this.game.turn() === 'b')
  //   {
  //     moveColor = 'Black'
  //   }

  //   // checkmate?
  //   if (this.game.in_checkmate())
  //   {
  //     statusTemp = 'Game over, ' + moveColor + ' is in checkmate'
  //   }

  //   // draw?
  //   else if (this.game.in_draw()) 
  //   {
  //     statusTemp = 'Game over, drawn position'
  //   }

  //   else
  //   {
  //     statusTemp = moveColor + ' to move'

  //     // check?
  //     if(this.game.in_check())
  //     {
  //       statusTemp += ', ' + moveColor + ' is in check'
  //     }
  //   }

  //   // this.$status = (status)
  //   // this.$fen(this.game.fen())
  //   // this.$pgn(this.game.pgn())

  //   $('#status').text(statusTemp)
  //   $('#fen').html(this.game.fen())
  //   $('#pgn').html(this.game.pgn())
  // }

  chessboardName: string = "board1";

  constructor(private chessboardService: ChessboardService){}
  ngOnInit(): void {
    this.setBoardName(this.chessboardName);
    this.setUpChessboard();
  }

  setUpChessboard(){
    this.chessboardService.setUpChessboard();
  }
  setBoardName(name:string){
    this.chessboardService.setBoardName(name);
  }
  
}
