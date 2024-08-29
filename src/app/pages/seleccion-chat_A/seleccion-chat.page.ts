import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController, AlertController } from '@ionic/angular';
import { ProfesionalResponse } from 'src/app/interfaces/intProfesional/ProfesionalResponse';
import { ProfesionalService } from 'src/app/services/profesional.service';
import { CalificarProfesService } from 'src/app/services/calificar-profes.service';

import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-seleccion-chat',
  templateUrl: './seleccion-chat.page.html',
  styleUrls: ['./seleccion-chat.page.scss'],
})
export class SeleccionChatPage implements OnInit {

  public Profesionales : ProfesionalResponse [] = [];
  public Estudiante = [];

  constructor(
    private navCtrl: NavController,
    private estService: ProfesionalService,
    private calService: CalificarProfesService,
    private socket: Socket,
    private actSheCtrl: ActionSheetController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    //Obtener estudiante logueado de local storage   
    const estu= localStorage.getItem('estu');
    if (estu){
      this.Estudiante = JSON.parse(estu);
    }
    
    //Servicio de profesional (para listar profesionales)
    this.estService.getProfesional()
    .subscribe(Profesional => this.Profesionales.push(...Profesional));
    this.BarraCarga(5);
  }

  BarraCarga(duracion: number) {
    const barraLoad = document.getElementById('progress-bar') as HTMLIonProgressBarElement;
    let progreso = 0;
    const intervalo = 100; 
    const incremento = (intervalo / (duracion * 1000)) * 100;

    const idIntervalo = setInterval(() => {
      progreso += incremento;
      if (progreso >= 100) {
        barraLoad.value = 1;
        clearInterval(idIntervalo);
        setTimeout(() => {
          barraLoad.style.opacity = '0';
          setTimeout(() => {
            barraLoad.style.display = 'none';
          }, 500); // Delay to hide after fading out
        }, 500); // Delay to show 100% before hiding
      } else {
        barraLoad.value = progreso / 100;
      }
    }, intervalo);
  }
  
  async mostrarActionSheet(Profesional: ProfesionalResponse) {
    const actionSheet = await this.actSheCtrl.create({
      header: 'Acciones',
      buttons: [
        {
          text: 'Iniciar chat',
          handler: () => {
            this.startChat(Profesional);
          }
        },
        {
          text: 'Calificar',
          handler: () => {
            this.rate(Profesional);
          }
        },
        {
          text: 'Cerrar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    await actionSheet.present();
  }

  startChat(Profesional: ProfesionalResponse) {
    // Lógica para iniciar chat
    localStorage.setItem('user-chat',JSON.stringify(this.Estudiante[1]));
    this.socket.connect();
    this.socket.emit('set-nickname', this.Estudiante[1]);
    this.navCtrl.navigateForward(`chat-room`) ;
  }


  //Funcion para calificar a un profesional
  async rate(Profesional: ProfesionalResponse) {

    //Alerta de entrada
    const alerta = await this.alertCtrl.create({
      header: 'Valorice la atención',
      inputs: [
        {
          name: 'Calificacion',
          type: 'number',
          placeholder: '1-5',
          min: 1,
          max: 5,
        },
      ],
      buttons: ['OK'],
    });

    await alerta.present();
    const { data } = await alerta.onDidDismiss();
    const {Calificacion} = data.values;
    if (data && data.values){
           
      var Califica = {
        Id_EstudianteRegis: this.Estudiante[0],
        Id_ProfesRegis: Profesional.Id_ProfesRegis,
        Calificacion: parseInt(Calificacion)
      }

      this.calService.postCalificar(Califica)
      .subscribe();
    }
  }
}


