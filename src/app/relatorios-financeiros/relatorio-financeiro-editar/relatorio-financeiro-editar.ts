import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RelatorioFinanceiroModel } from '../../models/relatorio-financeiro.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RelatorioFinanceiroService } from '../../services/relatorio-financeiro.service';

@Component({
  selector: 'app-relatorio-financeiro-editar',
  imports: [FormsModule],
  templateUrl: './relatorio-financeiro-editar.html',
  styleUrl: './relatorio-financeiro-editar.scss',
})
export class RelatorioFinanceiroEditar {
  relatorio = signal<RelatorioFinanceiroModel>({
    id: crypto.randomUUID(),
    titulo: "",
    tipo: "",
    valorTotal: null,
    dataEmissao: "",
    responsavel: ""
  })

  RelatorioFinanceiroService = inject(RelatorioFinanceiroService)


  constructor(private activeRoute: ActivatedRoute, private router: Router) {
    const idParaEditar = activeRoute.snapshot.paramMap.get("id");

    if (idParaEditar === null) {
      alert("Não encontrado o id da tarefa na rota");
      this.router.navigate(["/relatorios"]);
      return
    }

    this.relatorio.update(relatorio => ({
      ...relatorio,
      id: idParaEditar
    }))
    this.consultarRelatorio()
  }

  consultarRelatorio(): void {
    this.RelatorioFinanceiroService.obterPorId(this.relatorio().id).subscribe({
      next: relatorio => {
        this.relatorio.update(() => ({
          id: relatorio.id,
          titulo: relatorio.titulo,
          tipo: relatorio.tipo,
          valorTotal: relatorio.valorTotal,
          dataEmissao: relatorio.dataEmissao,
          responsavel: relatorio.responsavel
        }))
      },
      error: erro => {
        console.error("Não foi possível consultar o relatorio:", erro);
        alert("Não foi possível consultar o relatorio");
      }
    })
  }

  salvar(): void {
    this.RelatorioFinanceiroService.editar(this.relatorio().id, this.relatorio()).subscribe({
      next: () => {
        alert("relatorio alterado com sucesso");
        this.router.navigate(["/relatorios"]);
      },
      error: erro => {
        console.error("Não foi possível alterar o relatorio", erro);
        alert("Erro ao alterar o relatorio");
      }
    })
  }



}
