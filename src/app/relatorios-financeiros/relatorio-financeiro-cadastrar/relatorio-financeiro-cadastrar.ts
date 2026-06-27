import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RelatorioFinanceiroService } from '../../services/relatorio-financeiro.service';
import { Router } from '@angular/router';
import { RelatorioFinanceiroModel } from '../../models/relatorio-financeiro.model';

@Component({
  selector: 'app-relatorio-financeiro-cadastrar',
  imports: [FormsModule],
  templateUrl: './relatorio-financeiro-cadastrar.html',
  styleUrl: './relatorio-financeiro-cadastrar.scss',
})
export class RelatorioFinanceiroCadastrar {
  private readonly RelatorioFinanceiroService = inject(RelatorioFinanceiroService)
  private readonly router = inject(Router);

  relatorio = signal<RelatorioFinanceiroModel>({
    id: crypto.randomUUID(),
    titulo: "",
    tipo: "",
    valorTotal: null,
    dataEmissao: "",
    responsavel: ""
  })

  salvar(): void {
    this.RelatorioFinanceiroService.cadastrar(this.relatorio()).subscribe({
      next: () => {
        alert("Relatório cadastrado com sucesso")
        this.router.navigate
      },
      error: erro => {
      console.error("Erro ao cadastrar a tarefa: " + erro)
      alert("Ocorreu um erro ao cadasrar a tarefa");

      }
    })



  }



}
