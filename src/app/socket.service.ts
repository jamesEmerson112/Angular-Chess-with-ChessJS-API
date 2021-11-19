import { Injectable, OnInit } from '@angular/core';
import { io } from 'socket.io-client';

const SOCKET_ENDPOINT = 'localhost:3000'

@Injectable({
  providedIn: 'root'
})
export class SocketService implements OnInit{
  socket:any;

  constructor() { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  setupSocketConnection(){
    this.socket = io(SOCKET_ENDPOINT);
    return this.socket;
  }
}
