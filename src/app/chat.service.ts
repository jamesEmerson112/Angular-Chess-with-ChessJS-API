import { Injectable } from '@angular/core';
import { BehaviorSubject, isObservable } from 'rxjs';
import { io } from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // receiving messages with behavior
  public message$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() { }

  // what's the socket?
  socket = io('http://localhost:4200');

  public sendMessage(message:String) {
    this.socket.emit('message', message);
  }

  public getMessage() {
    this.socket.on('message', (message) => {
      // this.message$.receive(message);
      this.message$.next(message);
    });
    return this.message$.asObservable();
  }
}
