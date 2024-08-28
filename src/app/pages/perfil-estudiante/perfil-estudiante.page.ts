import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { EstudianteResponse } from 'src/app/interfaces/intEstudiantes/EstudianteResponse';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-perfil-estudiante',
  templateUrl: './perfil-estudiante.page.html',
  styleUrls: ['./perfil-estudiante.page.scss'],
})
export class PerfilEstudiantePage implements OnInit {

  formPerfilEstu: FormGroup;
  Estudiante: EstudianteResponse = {
    Id_EstudianteRegis: 0,
    idUcv_estu: '',
    Usuario: '',
    Contra: ''
  };
  Usu = [];

  constructor(
    private navCtrl: NavController,
    private estService: EstudianteService,
    public alertCrl: AlertController,
    private toastCtrl: ToastController,
    public fB: FormBuilder
  ) { 
    this.formPerfilEstu = this.fB.group({
      'idUcv': new FormControl("",Validators.required),
      'usuario': new FormControl("",Validators.required)
    })
  }

  async ngOnInit() {
    //Obtención de datos del estudiante logueado
    const est = localStorage.getItem('estu')
    if(est){
      this.Usu = JSON.parse(est);
    }else{
      this.Usu = [];
    }

    //Busqueda de información en BD mediante servicio
    const estu = await firstValueFrom(
      this.estService.getUnEstudiante(this.Usu[0]));

    //Actualización de valores del form
    this.formPerfilEstu.patchValue({
      idUcv: estu.idUcv_estu,
      usuario: estu.Usuario
    })

    //Seteo de información de estudiante obtenido de BD
    this.Estudiante = {
      Id_EstudianteRegis: estu.Id_EstudianteRegis,
      idUcv_estu: estu.idUcv_estu,
      Usuario: estu.Usuario,
      Contra: estu.Contra
    }
  }

  async nuevaContra(){
    const  passActual = this.Estudiante.Contra;

    const alert = await this.alertCrl.create({
      header: 'Seguridad',
      inputs: [
        {
        name: 'passActual',
        type: 'password',
        placeholder: 'Ingrese contraseña actual',
        },
        {
          name: 'passNueva',
          type: 'password',
          placeholder: 'Ingrese nueva contraseña',
        },
    ],
    buttons: [
      {
        text: 'OK',
        handler: (data) => {
          if (data.passActual === passActual) {
            this.cambiarContra(data.passNueva); 
            this.verToast('Contraseña cambiada con éxito')
            return true; 
          } else {
            //Muestra de aviso
            this.verToast('Contraseña incorrecta, intente de nuevo')
            return false;
          }
        }
      }
    ]
    });
    await alert.present();
  }

  SesionOff(){
    localStorage.removeItem('estu');
    this.navCtrl.navigateBack('login-estudiante');
  }

  async cambiarContra(passNueva: string){
    //Hacer "copia" de estudiante, cambiando solo "Contra"
    let newEstu = {
      ...this.Estudiante,
      Contra: passNueva
    }
    this.estService.updatePass(newEstu.Id_EstudianteRegis,newEstu)
    .subscribe(resp => console.log(resp))
  }

  async verToast(msg: string){
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
