import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as ChessJS from 'chess.js';
import * as $ from "jquery";      // same as declare var $: any;
import { BehaviorSubject, Observable } from 'rxjs';
import { timer } from 'rxjs';
import {ChessboardService} from '../chessboard.service';
import { SocketService } from '../socket.service';
import { Injectable } from '@angular/core';


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
  // tempCodeFEN: string ="";
  newCodeFEN: string="";
  codeFENList: string[]=[];

  // for receiving info
  public playerColor$: BehaviorSubject<string> = new BehaviorSubject('');
  public codeFEN$: BehaviorSubject<string> = new BehaviorSubject('');
  public PGN$: BehaviorSubject<string> = new BehaviorSubject('');

  chessboardName: string = "board1";
  playerColor: string = "";
  PGN: string ="";

  constructor(private chessboardService: ChessboardService,
    private socketService: SocketService){}

  ngOnInit(): void {
    this.setBoardName(this.chessboardName);
    this.setUpChessboard();
    this.setupSocketConnection();
    this.getCodeFEN().subscribe((codeFEN:string)=>
    {
      this.codeFENList.push(codeFEN);
      this.updateChessBoard(codeFEN);
      if(codeFEN != "")
        // this.updateChessBoard(codeFEN);
        console.log("FEN is received: " + codeFEN)
    })

    this.getPGN().subscribe((PGN:string)=>
    {
      // this.PGN = PGN;
      if(PGN != "")
      {
        this.updateChessBoard(PGN);
        console.log(PGN)
      }
        
    })
  }

  public setPlayerColor(playerColor:string){
    this.chessboardService.setPlayerColor(playerColor);
  }

  public getPlayerColor() {
    this.socket.on('playerColor', (playerColor: string) => {
      this.playerColor$.next(playerColor);
    });
    return this.playerColor$.asObservable();
  }

  public getPGN() {
    this.socket.on('PGN', (PGN: string) => {
      this.PGN$.next(PGN);
    });
    return this.PGN$.asObservable();
  }

  
  public getCodeFEN() {
    this.socket.on('codeFEN', (codeFEN: string) => {
      this.codeFEN$.next(codeFEN);
    });
    return this.codeFEN$.asObservable();
  }

  public setUpChessboard(){
      this.chessboardService.setUpChessboard();
  }
  
  // public updateChessBoard(codeFEN:string){
  //   this.chessboardService.updateChessBoard(codeFEN);
  // }

  public updateChessBoard(PGN:string){
    this.chessboardService.updateChessBoard(PGN);
  }

  public setBoardName(name:string){
    this.chessboardService.setBoardName(name);
  }
  
  public setupSocketConnection(){
    this.socket = this.socketService.setupSocketConnection();
  }

  sayYes(){
    this.newCodeFEN="Yes "
  }

  // sendCodeFEN(){
  //   // this.setCodeFEN();
  //   // this.socket.emit('codeFEN', this.newCodeFEN);
  // }

  public setCodeFEN() {
    this.newCodeFEN = this.chessboardService.getFEN();
  }
}
