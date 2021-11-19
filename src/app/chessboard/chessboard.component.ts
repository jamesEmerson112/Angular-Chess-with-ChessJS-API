import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as ChessJS from 'chess.js';
import * as $ from "jquery";      // same as declare var $: any;
import { BehaviorSubject } from 'rxjs';
import {ChessboardService} from '../chessboard.service';
import { SocketService } from '../socket.service';


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
  socket: any;
  tempCodeFEN: string ="";
  newCodeFEN: string="";
  codeFENList: string[]=[];

  public codeFEN$: BehaviorSubject<string> = new BehaviorSubject('');

  chessboardName: string = "board1";

  constructor(private chessboardService: ChessboardService,
    private socketService: SocketService){}

  ngOnInit(): void {
    this.setBoardName(this.chessboardName);
    this.setUpChessboard();
    this.sendFEN();
    this.getCodeFEN().subscribe((codeFEN:string)=>
    {
      this.codeFENList.push(codeFEN);
    })
  }

  public sendCodeFEN() {
    this.tempCodeFEN = this.chessboardService.getFEN();
    this.socket.emit('codeFEN', this.tempCodeFEN);
  }

  getCodeFEN() {
    this.socket.on('codeFEN', (codeFEN: string) => {
      this.codeFEN$.next(codeFEN);
    });
    return this.codeFEN$.asObservable();
  }

  setUpChessboard(){
    this.chessboardService.setUpChessboard();
  }
  setBoardName(name:string){
    this.chessboardService.setBoardName(name);
  }
  
  setupSocketConnection(){
    this.socket = this.socketService.setupSocketConnection();
  }

  sayYes(){
    // this.codeFEN="Yes "
  }

  getFEN(){
    // this.codeFEN = this.chessboardService.getFEN();
    // this.codeFEN="Yes"
  }

  sendFEN(){
    // this.socket.emit('sendFEN', this.codeFEN);
  }
}
