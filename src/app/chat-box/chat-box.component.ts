import { Component, Inject, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { io } from 'socket.io-client';
import { DOCUMENT } from '@angular/common';
import { SocketService } from '../socket.service';

const SOCKET_ENDPOINT = 'localhost:3000'

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {
  newMessage: string ="";
  messageList: string[]=[];
  username: string = "";
  hiddenButton: boolean = false;
  socket:any;
  public isButtonVisible = true;
  public isUsernameVisible = true;

  constructor(
    private chatService: ChatService,
    private socketService: SocketService) { }

  ngOnInit(): void {
    this.setupSocketConnection();
    this.chatService.getSocket(this.socket);
    this.chatService.getMessage().subscribe((message:string)=>
    {
      this.messageList.push(message)
    })
  }

  setupSocketConnection(){
    this.socket = this.socketService.setupSocketConnection();
  }
  sendMessage() {
    // this.newMessage = this.username + ": " +this.newMessage
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = "";
  }

  setUsername()
  {
    this.chatService.setUsername(this.username);
  }
}
