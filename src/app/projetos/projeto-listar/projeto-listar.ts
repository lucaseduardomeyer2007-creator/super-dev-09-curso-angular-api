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
      total += projeto.horasEstimadas ?? 0;
    });
    return total;
  })

  carregarProjetos(): void {
    // subscribe : inscreve no Observable é isso que dispara a requisição
    // Para o back-end
    this.projetoService.listar().subscribe({
      // Next é o caso de sucesso
      next: projetos => {
        const projetosOrdenadas = projetos.sort((x, y) => x.descricao.localeCompare(y.descricao));
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
    this.projetos.update(projetos => projetos.filter(x => x.id !== id))
    const projetosString = JSON.stringify(this.projetos());
    localStorage.setItem("projetos", projetosString);
  }
}
