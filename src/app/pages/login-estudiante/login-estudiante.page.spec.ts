import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginEstudiantePage } from './login-estudiante.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EstudianteService } from 'src/app/services/estudiante.service';


describe('LoginEstudiantePage', () => {
  let component: LoginEstudiantePage;
  let fixture: ComponentFixture<LoginEstudiantePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginEstudiantePage],
      imports: [HttpClientTestingModule], // Incluye el módulo de pruebas para HttpClient
      providers: [EstudianteService] // Asegúrate de proporcionar tu servicio si es necesario
    }).compileComponents();
  });
  
  beforeEach(() => {
    fixture = TestBed.createComponent(LoginEstudiantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
