import { Component, OnDestroy, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ToastController } from '@ionic/angular';
import { UserData } from '../../interfaces/intChat/UserData';
import { Message as Mensaje } from '../../interfaces/intChat/Message';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.page.html',
  styleUrls: ['./chat-room.page.scss'],
})
export class ChatRoomPage implements OnInit, OnDestroy{

  mensajes: Mensaje[] = [];
  nick: string | null = '';
  mensaje: string = '';

  constructor(
    private socket: Socket,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {

    const uc = localStorage.getItem('user-chat');
    if(uc){
      this.nick = JSON.parse(uc);
    } else{
      this.nick = 'vacio';
    }

    this.socket.on('message', (message: Mensaje) => this.mensajes.push(message));

    this.socket.on('users-changed', (data: UserData) => {
      const user = data['user'];
      if (data['event'] === 'left') {
        this.showToast(user + ' abandonó el chat');
      } else {
        this.showToast(user + ' se unió al chat');
      }
    });
  }
  enviarMensaje() {
    this.socket.emit('add-message', { text: this.mensaje });
    this.mensaje = '';
  }

  ngOnDestroy() {
    this.socket.disconnect();
  }

  async showToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}