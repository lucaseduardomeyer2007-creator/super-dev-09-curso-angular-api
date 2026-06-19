import { inject, Injectable } from '@angular/core';
import { TarefaModel } from '../models/tarefa.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TarefaService {
// Cliente responsável por fazer a requisição para o back end(api)
private readonly http = inject(HttpClient);

listar(): Observable<TarefaModel[]> {

const url = "https://api.franciscosensaulas.com/api/v1/trabalho/tarefas";

// Fazer requisição para carregar a lista de tarefas
return this.http.get<TarefaModel[]>(url);
}

cadastrar(tarefa: TarefaModel): Observable<TarefaModel>{
const url = "https://api.franciscosensaulas.com/api/v1/trabalho/tarefas";

 return this.http.post<TarefaModel>(url, tarefa);

}



}
