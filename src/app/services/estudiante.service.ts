import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstudianteResponse } from '../interfaces/intEstudiantes/EstudianteResponse';
import { EstudianteRequest } from '../interfaces/intEstudiantes/EstudianteRequest';
import { Observable } from 'rxjs';
import { EstudianteLogin } from '../interfaces/intEstudiantes/EstudianteLogin';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  constructor( private http: HttpClient) { }

  getEstudiantes(): Observable<EstudianteResponse[]>{
    return this.http.get<EstudianteResponse[]>
    ('http://localhost:3000/estudiante');
  }

  postEstudiante(estudiante: EstudianteRequest): Observable<EstudianteRequest>{
    return this.http.post<EstudianteRequest>
    ('http://localhost:3000/estudiante/register',estudiante);
  }

  loginEstudiante(estLogin: EstudianteLogin):Observable<EstudianteResponse>{
    return this.http.post<EstudianteResponse>('http://localhost:3000/estudiante/login',estLogin);
  }

  getUnEstudiante(id: number): Observable<EstudianteResponse>{
    return this.http.get<EstudianteResponse>
    (`http://localhost:3000/estudiante/${id}`);
  }

  updatePass(id: number, estudiante: EstudianteRequest): Observable<EstudianteRequest>{
    return this.http.patch<EstudianteRequest>
    (`http://localhost:3000/estudiante/${id}`,estudiante);
  }

}
