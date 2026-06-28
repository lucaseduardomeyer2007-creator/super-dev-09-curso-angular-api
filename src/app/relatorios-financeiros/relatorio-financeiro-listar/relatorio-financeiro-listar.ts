import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RelatorioFinanceiroService } from '../../services/relatorio-financeiro.service';
import { RelatorioFinanceiroModel } from '../../models/relatorio-financeiro.model';

@Component({
  selector: 'app-relatorio-financeiro-listar',
  imports: [RouterLink],
  templateUrl: './relatorio-financeiro-listar.html',
  styleUrl: './relatorio-financeiro-listar.scss',
})
export class RelatorioFinanceiroListar {
  private readonly relatorioFinanceiroService = inject(RelatorioFinanceiroService)

  relatorios = signal<RelatorioFinanceiroModel[]>([]);


  ngOnInit() {
    this.carregarRelatorios();
  }

  carregarRelatorios(): void {
    this.relatorioFinanceiroService.listar().subscribe({
      next: relatorios => {
        const relatoriosOrdenados = relatorios.sort((x, y) => x.tipo.localeCompare(y.tipo));
        this.relatorios.set(relatoriosOrdenados);
      },

      error: erro => {
        console.error("Erro ao carregar as tarefas:", erro);
        alert("Não foi possível carregar as tarefas");
      }
    })
  }

  apagar(id: string): void {
    this.relatorioFinanceiroService.apagar(id).subscribe({
      next: () => {
        alert("Relatório apagado com sucesso")
        this.carregarRelatorios
      },

      error: erro => {
        console.error("Erro ao tentar apagar a tarefa:", erro);
        alert("Não foi possível apagar seu relatório");

      }

    })


  }



}
