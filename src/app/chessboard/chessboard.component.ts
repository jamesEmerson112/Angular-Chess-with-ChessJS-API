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

  public codeFEN$: BehaviorSubject<string> = new BehaviorSubject('');

  chessboardName: string = "board1";

  constructor(private chessboardService: ChessboardService,
    private socketService: SocketService){}

  ngOnInit(): void {
    this.setBoardName(this.chessboardName);
    this.setUpChessboard();
    this.setupSocketConnection();
    this.getCodeFEN().subscribe((codeFEN:string)=>
    {
      this.codeFENList.push(codeFEN);
      if(codeFEN != "")
        this.updateChessBoard(codeFEN);
        console.log(codeFEN)
    })
  }

  public setUpChessboard(){
      this.chessboardService.setUpChessboard();
  }
  
  public updateChessBoard(codeFEN:string){
    this.chessboardService.updateChessBoard(codeFEN);
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

  public getCodeFEN() {
    this.socket.on('codeFEN', (codeFEN: string) => {
      this.codeFEN$.next(codeFEN);
    });
    return this.codeFEN$.asObservable();
  }

  // sendCodeFEN(){
  //   // this.setCodeFEN();
  //   // this.socket.emit('codeFEN', this.newCodeFEN);
  // }

  public setCodeFEN() {
    this.newCodeFEN = this.chessboardService.getFEN();
  }
}
