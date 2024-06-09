import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CalificaProfeRequest } from '../interfaces/intCalificacion/CalificaProfeRequest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalificarProfesService {
  
  constructor(private http: HttpClient) { }

  getEstudiantes(): Observable<CalificaProfeRequest[]>{
    return this.http.get<CalificaProfeRequest[]>
    ('http://localhost:3000/calificar-profe');
  }

  postCalificar(calificacion: CalificaProfeRequest): Observable<CalificaProfeRequest>{
    return this.http.post<CalificaProfeRequest>
    ('http://localhost:3000/calificar-profe',calificacion);
  }

}
