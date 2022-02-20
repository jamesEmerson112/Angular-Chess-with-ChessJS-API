import { Injectable, OnInit } from '@angular/core';
import * as ChessJS from 'chess.js';
import * as $ from "jquery";      // same as declare var $: any;
import { BehaviorSubject } from 'rxjs';
import { SocketService } from './socket.service';

// declare ChessBoard here
declare var ChessBoard: any;
const Chess = typeof ChessJS === "function" ? ChessJS : ChessJS.Chess;      // quick fix to use chessJs

@Injectable({
  providedIn: 'root'
})
export class ChessboardService {

  // ***********************VARIABLE***********************
  board: any;
  socket: any;

  game = new Chess();
  canEdit = false;

  codeFEN: string = "";
  name: string = "";
  playerColor: string ="";
  PGN: string = "";

  // for sending info because we want to send every time we make a move
  // public playerColor$: BehaviorSubject<string> = new BehaviorSubject('');
  public codeFEN$: BehaviorSubject<string> = new BehaviorSubject('');
  // public PGN$: BehaviorSubject<string> = new BehaviorSubject('');
  

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
  newChessConfig: any;


  constructor(private socketService: SocketService) { 
  }

  // ***********************FUNCTIONS***********************

  public setBoardName(name: string){
    this.name = name;
  }

  public getBoardName():string{
    return this.name;
  }

  public setupSocketConnection(){
    this.socket = this.socketService.setupSocketConnection();
  }

  public setUpChessboard(): void {
    this.setupSocketConnection();
    this.board = ChessBoard(this.getBoardName(), this.initialChessConfig);
  }

  public sendCodeFEN(){
    this.socket.emit('codeFEN', this.codeFEN);

    this.socket.emit('playerColor', this.playerColor);
    this.socket.emit('PGN', this.PGN);
    console.log("sendCodeFEN")
  }

  // public getCodeFEN() {
  //   this.socket.on('codeFEN', (codeFEN: string) => {
  //     this.codeFEN$.next(codeFEN);
  //   });
  //   return this.codeFEN$.asObservable();
  // }

  // public getPlayerColor() {
  //   this.socket.on('playerColor', (playerColor: string) => {
  //     this.playerColor$.next(playerColor);
  //   });
  //   return this.playerColor$.asObservable();
  // }

  // public getPNG() {
  //   this.socket.on('PGN', (PGN: string) => {
  //     this.PGN$.next(PGN);
  //   });
  //   return this.PGN$.asObservable();
  // }

  public updateChessBoard(PGN:string){
    // this.newChessConfig = {
    //   position: codeFEN,
    //   draggable: true,
    //   // sparePieces: true,
    //   dropOffBoard: 'snapback',
    //   moveSpeed: 'slow',
    //   snapbackSpeed:500,
    //   snapSpeed: 100,
    //   onDragStart: this.onDragStart.bind(this),
    //   onDrop: this.onDrop.bind(this),
    //   // onSnapEnd: this.onSnapEnd.bind(this)
    // }
    // this.board = ChessBoard(this.getBoardName(), this.newChessConfig);
    this.game.load_pgn(this.PGN);
    // if(this.game.getTurn() == "b")   this.game.setTurn("w");
    // this.game.setTurn("w");
    console.log("updateChessBoard")
  }

  public setPlayerColor(playerColor: string) {
    return;
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
  public onDragStart(source: any, piece: any, position: any, orientation: any) {
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
  public onDrop (source:any, target:any){
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
    console.log("onDrop")
    return;
  }

  /**
   * onSnapEnd()update the board position after the piece snap
   * for castling, en passant, pawn promotion
   */

  public onSnapEnd() {
    this.board.position(this.game.fen());
  }

  /**
   * updateStatus keeps the game updated. Update each turn
   */
  public updateStatus() {
    let statusTemp = '';
    
    let moveColor = 'White';
    if (this.game.turn() === 'b')
      moveColor = 'Black'

    // checkmate?
    if (this.game.in_checkmate())
      statusTemp = 'Game over, ' + moveColor + ' is in checkmate';
    else if (this.game.in_draw()) 
      statusTemp = 'Game over, drawn position'
    else
    {
      statusTemp = moveColor + ' to move'
      if(this.game.in_check())
        statusTemp += ', ' + moveColor + ' is in check'
    }

    // debug
    // automatically update to the html attributes
    $('#status').text(this.game.turn())
    $('#fen').html(this.game.fen())
    $('#pgn').html(this.game.pgn())

    $('#test').html(this.game.fen())

    this.playerColor = this.game.turn().toString();
    this.codeFEN = this.game.fen().toString();
    this.PGN = this.game.pgn().toString();


    console.log("test PGN " + this.PGN)
    this.sendCodeFEN();

    console.log("updateStatus: game turn is "+ this.game.turn())
  }
  
  public getFEN()
  {
    return this.codeFEN;
  }

}
