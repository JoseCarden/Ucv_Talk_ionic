import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeleccionChatPage } from './seleccion-chat.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProfesionalService } from 'src/app/services/profesional.service';
import { CalificarProfesService } from 'src/app/services/calificar-profes.service';


describe('SeleccionChatPage', () => {
  let component: SeleccionChatPage;
  let fixture: ComponentFixture<SeleccionChatPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeleccionChatPage],
      imports: [HttpClientTestingModule], // Incluye el módulo de pruebas para HttpClient
      providers: [ProfesionalService,CalificarProfesService] // Asegúrate de proporcionar tu servicio si es necesario
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
