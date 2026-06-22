import { inject, Injectable } from '@angular/core';
import { ProjetoModel } from '../models/projeto.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProjetoService {
  // Cliente responsável por fazer a requisição para o back end(api)
  private readonly http = inject(HttpClient);

  listar(): Observable<ProjetoModel[]> {

    const url = "https://api.franciscosensaulas.com/api/v1/trabalho/projetos";


    return this.http.get<ProjetoModel[]>(url);
  }

  cadastrar(projeto: ProjetoModel): Observable<ProjetoModel> {
    const url = "https://api.franciscosensaulas.com/api/v1/trabalho/projetos";

    return this.http.post<ProjetoModel>(url, projeto);

  }
}
