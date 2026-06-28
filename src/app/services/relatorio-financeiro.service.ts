import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { RelatorioFinanceiroModel } from '../models/relatorio-financeiro.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RelatorioFinanceiroService {

  private readonly http = inject(HttpClient)

  private readonly baseUrl = `${environment.apiUrl}/api/v1/trabalho/relatorios-financeiros`

  listar(): Observable<RelatorioFinanceiroModel[]> {
    const url = this.baseUrl;
    return this.http.get<RelatorioFinanceiroModel[]>(url);
  }


  cadastrar(relatorio: RelatorioFinanceiroModel): Observable<RelatorioFinanceiroModel> {
    const url = this.baseUrl;

    return this.http.post<RelatorioFinanceiroModel>(url, relatorio);
  }

  apagar(id: string): Observable<void> {
    const url = `${this.baseUrl}/${id}`;

    return this.http.delete<void>(url);
  }

  obterPorId(id: string): Observable<RelatorioFinanceiroModel> {
      const url = `${this.baseUrl}/${id}`;
      return this.http.get<RelatorioFinanceiroModel>(url);
    }
  
    editar(id: string, relatorio: RelatorioFinanceiroModel): Observable<void> {
      const url = `${this.baseUrl}/${id}`;
      return this.http.put<void>(url, relatorio);
    }


}
