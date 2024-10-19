import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportEstuPage } from './report-estu.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReporteEstuService } from 'src/app/services/reporte-estu.service';

describe('ReportEstuPage', () => {
  let component: ReportEstuPage;
  let fixture: ComponentFixture<ReportEstuPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportEstuPage],
      imports: [HttpClientTestingModule], // Incluye el módulo de pruebas para HttpClient
      providers: [ReporteEstuService] // Asegúrate de proporcionar tu servicio si es necesario
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportEstuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
