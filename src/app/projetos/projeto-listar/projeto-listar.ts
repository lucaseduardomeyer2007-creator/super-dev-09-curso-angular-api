import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjetoService } from '../../services/projeto.service';
import { ProjetoModel } from '../../models/projeto.model';

@Component({
  selector: 'app-projeto-listar',
  imports: [RouterLink],
  templateUrl: './projeto-listar.html',
  styleUrl: './projeto-listar.scss',
})
export class ProjetoListar {
  private readonly projetoService = inject(ProjetoService);

  projetos = signal<ProjetoModel[]>([]);

  ngOnInit() {
    this.carregarProjetos();
  }

  readonly totalMinutos = computed(() => {
    let total = 0;
    this.projetos().forEach(projeto => {
      total += projeto.custoEstimado ?? 0;
    });
    return total;
  })

  carregarProjetos(): void {
    // subscribe : inscreve no Observable é isso que dispara a requisição
    // Para o back-end
    this.projetoService.listar().subscribe({
      // Next é o caso de sucesso
      next: projetos => {
        const projetosOrdenadas = projetos.sort((x, y) => x.nome.localeCompare(y.nome));
        this.projetos.set(projetosOrdenadas);
      },
      // error é o caso de falha
      error: erro => { 
        console.error("Erro ao carregar os projetos:", erro);
        alert("Não foi possível carregar os projetos");
      }
    })


  }

  apagar(id: string): void {
    this.projetoService.apagar(id).subscribe({
      next: () => {
        alert("Tarefa Apagada com sucesso");
        this.carregarProjetos();
      },
      error: erro => {
        console.error("Erro ao tentar apagar a tarefa:", erro);
        alert("Não foi possível apagar sua tarefa");
      }
    })
  }
}
