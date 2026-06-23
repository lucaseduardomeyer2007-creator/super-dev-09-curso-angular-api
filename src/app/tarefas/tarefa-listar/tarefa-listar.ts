import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TarefaModel } from '../../models/tarefa.model';
import { TarefaService } from '../../services/tarefa.service';

@Component({
  selector: 'app-tarefa-listar',
  imports: [RouterLink],
  templateUrl: './tarefa-listar.html',
  styleUrl: './tarefa-listar.scss',
})
export class TarefaListar {
  private readonly tarefaService = inject(TarefaService);

  tarefas = signal<TarefaModel[]>([]);

  ngOnInit() {
    this.carregarTarefas();
  }

  readonly totalMinutos = computed(() => {
    let total = 0;
    this.tarefas().forEach(tarefa => {
      total += tarefa.horasEstimadas ?? 0;
    });
    return total;
  })

  carregarTarefas(): void {
    // subscribe : inscreve no Observable é isso que dispara a requisição
    // Para o back-end
    this.tarefaService.listar().subscribe({
      // Next é o caso de sucesso
      next: tarefas => {
        const tarefasOrdenadas = tarefas.sort((x, y) => x.descricao.localeCompare(y.descricao));
        this.tarefas.set(tarefasOrdenadas);
      },
      // error é o caso de falha
      error: erro => {
        console.error("Erro ao carregar as tarefas:", erro);
        alert("Não foi possível carregar as tarefas");
      }
    })


  }

  apagar(id: string): void {
    this.tarefaService.apagar(id).subscribe({
      next: () => {
        alert("Tarefa Apagada com sucesso");
        this.carregarTarefas();
      },
      error: erro => {
        console.error("Erro ao tentar apagar a tarefa:", erro);
        alert("Não foi possível apagar sua tarefa");
      }
    })
  }
}
