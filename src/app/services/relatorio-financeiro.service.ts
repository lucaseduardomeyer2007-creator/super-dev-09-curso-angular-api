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

  cadastrar(relatorio: RelatorioFinanceiroModel): Observable<RelatorioFinanceiroModel> {
    const url = this.baseUrl;

    return this.http.post<RelatorioFinanceiroModel>(url, relatorio);
  }

  listar(): Observable<RelatorioFinanceiroModel[]> {
    const url = this.baseUrl;
    return this.http.get<RelatorioFinanceiroModel[]>(url);
  }

}
