import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ReporteEstuService } from 'src/app/services/reporte-estu.service';

@Component({
  selector: 'app-report-estu',
  templateUrl: './report-estu.page.html',
  styleUrls: ['./report-estu.page.scss'],
})
export class ReportEstuPage implements OnInit {

  formReporEstu: FormGroup;
  public Estudiante = [];
  asuntos = ['Chantaje', 'Información errónea', 'Trato inadecuado', 'Demora de atención', 'Experiencia de usuario deficiente'];
  isOtro = false;

  constructor(
    private repEService: ReporteEstuService,
    public alertCrl: AlertController,
    private toastCtrl: ToastController,
    public fb: FormBuilder
  ) { 
    this.formReporEstu = this.fb.group({
      'asunto': new FormControl("", Validators.required),
      'otroAsunto': new FormControl(""),
      'descripcion': new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
    const estu = localStorage.getItem('estu');
    if (estu) {
      this.Estudiante = JSON.parse(estu);
    }
  }

  checkAsunto(event: any) {
    this.isOtro = event.detail.value === 'otro';
    if (this.isOtro) {
      this.formReporEstu.get('otroAsunto')?.setValidators(Validators.required);
    } else {
      this.formReporEstu.get('otroAsunto')?.clearValidators();
    }
    this.formReporEstu.get('otroAsunto')?.updateValueAndValidity();
  }

  async NuevoReporteEstu() {
    var form = this.formReporEstu.value;

    if (this.formReporEstu.invalid) {
      const alert = await this.alertCrl.create({
        header: 'Faltan datos',
        message: 'Debe rellenar los campos',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

    var ReporEstu = {
      Asunto: form.asunto,
      Descripcion: form.descripcion,
      Id_EstudianteRegis: this.Estudiante[0]
    };

    this.repEService.postReporEstu(ReporEstu)
      .subscribe(resp => {
        console.log(resp);
      });

    const toast = await this.toastCtrl.create({
      message: 'Reporte registrado, gracias por su colaboración',
      duration: 1500,
      position: 'bottom'
    });
    await toast.present();

    this.formReporEstu.reset();
  }
}
