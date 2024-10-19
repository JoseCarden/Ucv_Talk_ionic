import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogupEstudiantePage } from './logup-estudiante.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EstudianteService } from 'src/app/services/estudiante.service';

describe('LogupEstudiantePage', () => {
  let component: LogupEstudiantePage;
  let fixture: ComponentFixture<LogupEstudiantePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogupEstudiantePage],
      imports: [HttpClientTestingModule], // Incluye el módulo de pruebas para HttpClient
      providers: [EstudianteService] // Asegúrate de proporcionar tu servicio si es necesario
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogupEstudiantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
