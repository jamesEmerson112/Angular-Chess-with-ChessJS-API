import { Injectable } from '@angular/core';
import { BehaviorSubject, isObservable } from 'rxjs';
import { io } from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  socket: any;

  // receiving messages with behavior
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  // public username$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() { }

  public getSocket(socket: any){
    this.socket = socket;
  }

  public sendMessage(message:String) {
    this.socket.emit('message', message);
  }

  public getMessage() {
    this.socket.on('message', (message: string) => {
      // this.message$.receive(message);
      this.message$.next(message);
    });
    return this.message$.asObservable();
  }

  public setUsername(username: string) {
    this.socket.emit('setUsername', username)
  }
}
