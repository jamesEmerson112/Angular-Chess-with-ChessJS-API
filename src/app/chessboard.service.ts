import { Injectable, OnInit } from '@angular/core';
import * as ChessJS from 'chess.js';
import * as $ from "jquery";      // same as declare var $: any;

// declare ChessBoard here
declare var ChessBoard: any;
const Chess = typeof ChessJS === "function" ? ChessJS : ChessJS.Chess;

@Injectable({
  providedIn: 'root'
})
export class ChessboardService {

  
  board: any;
  canEdit = false;
  codeFEN: string = "";

  // ***********************VARIABLE***********************
  boardLegalMove: any = null;
  game = new Chess();
  name:string = "";
  // this config is using available functions from chessjs
  initialChessConfig = {
    position: 'start',
    draggable: true,
    // sparePieces: true,
    dropOffBoard: 'snapback',
    moveSpeed: 'slow',
    snapbackSpeed:500,
    snapSpeed: 100,
    onDragStart: this.onDragStart.bind(this),
    onDrop: this.onDrop.bind(this),
    onSnapEnd: this.onSnapEnd.bind(this)
  }


  constructor() { 
  }



  // ***********************FUNCTIONS***********************

  setBoardName(name: string){
    this.name = name;
  }

  getBoardName():string{
    console.log(this.name);
    return this.name;
  }

  setUpChessboard(): void {
    this.board = ChessBoard(this.getBoardName(), this.initialChessConfig);
  }

  /**
   * onDragStart is triggered when a piece is picked up. It helps to define whether
   * the game is over or not; hence, if it is over, no chess pieces should be picked up.
   * it also defines whose turn it is
   * @param source 
   * @param piece 
   * @param position 
   * @param orientation 
   * @returns false if the game is over or false if the turn is invalid
   */
  onDragStart(source: any, piece: any, position: any, orientation: any) {
    // do not pick up pieces if the game is over
    console.log(this.game.game_over())
    if (this.game.game_over())
      return false;
    
    // only pick up pieces for the side to move
    if((this.game.turn() == 'w' && piece.search(/^b/) != -1) ||
    (this.game.turn() == 'b' && piece.search(/^w/) != -1))
    {
      return false;
    }
    return true;
  };

  /**
   * onDrop is triggered when a piece is dropped. 
   * It checks if a move of a piece is legal or illegal
   * @param source 
   * @param target 
   * @returns false if the game is over or false if the turn is invalid
   */
  onDrop (source:any, target:any){
    // see if the move is legal
    let move = this.game.move(
      {
        from: source,
        to: target,
        promotion: 'q'  // Note: always promote to a queen for example simplicity
      }
    )

    // illegal move
    if (move === null) return 'snapback'

    this.updateStatus();

    return;
  }

  /**
   * onSnapEnd()update the board position after the piece snap
   * for castling, en passant, pawn promotion
   */

  onSnapEnd() {
    this.board.position(this.game.fen());
  }

  /**
   * updateStatus keeps the game updated. Update each turn
   */
  updateStatus() {
    let statusTemp = '';
    
    let moveColor = 'White';
    if (this.game.turn() === 'b')
    {
      moveColor = 'Black'
    }

    // checkmate?
    if (this.game.in_checkmate())
    {
      statusTemp = 'Game over, ' + moveColor + ' is in checkmate'
    }

    // draw?
    else if (this.game.in_draw()) 
    {
      statusTemp = 'Game over, drawn position'
    }

    else
    {
      statusTemp = moveColor + ' to move'

      // check?
      if(this.game.in_check())
      {
        statusTemp += ', ' + moveColor + ' is in check'
      }
    }

    // debug
    // automatically update to the html attributes
    $('#status').text(statusTemp)
    $('#fen').html(this.game.fen())
    $('#pgn').html(this.game.pgn())

    this.codeFEN = this.game.fen().toString();
  }
  
  getFEN()
  {
    return this.codeFEN;
  }

}
