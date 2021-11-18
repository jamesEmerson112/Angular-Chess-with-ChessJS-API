import { Component, Inject, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { io } from 'socket.io-client';
import { DOCUMENT } from '@angular/common';
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
    @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.setupSocketConnection();
    this.chatService.getSocket(this.socket);
    this.chatService.getMessage().subscribe((message:string)=>
    {
      this.messageList.push(message)
    })
  }

  setupSocketConnection(){
    this.socket = io(SOCKET_ENDPOINT);
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
