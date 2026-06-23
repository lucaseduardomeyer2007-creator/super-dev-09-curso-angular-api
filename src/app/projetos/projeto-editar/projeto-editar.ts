import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjetoModel } from '../../models/projeto.model';
import { ProjetoService } from '../../services/projeto.service';
@Component({
  selector: 'app-projeto-editar',
  imports: [FormsModule],
  templateUrl: './projeto-editar.html',
  styleUrl: './projeto-editar.scss',
})
export class ProjetoEditar {
  projeto = signal<ProjetoModel>({
    id: "",
    nome: "",
    codigoProjeto: "",
    custoEstimado: null
  });

  projetoService = inject(ProjetoService);

  constructor(private activeRoute: ActivatedRoute, private router: Router) {

    const idParaEditar = activeRoute.snapshot.paramMap.get("id");

    if (idParaEditar === null) {
      alert("Não encontrado o id da projeto na rota");
      this.router.navigate(["/projetos"]);
      return
    }

    this.projeto.update(projeto => ({
      ...projeto,
      id: idParaEditar
    }))
    this.consultarprojeto()
  }

  consultarprojeto(): void {
    this.projetoService.obterPorId(this.projeto().id).subscribe({
      next: projeto => {
        this.projeto.update(() => ({
          id: projeto.id,
          nome: projeto.nome,
          codigoProjeto: projeto.codigoProjeto,
          custoEstimado: projeto.custoEstimado
        }))
      },
      error: erro => {
        console.error("Não foi possível consultar a projeto:", erro);
        alert("Não foi possível consultar a projeto");
      }
    })
  }

  salvar(): void {
    this.projetoService.editar(this.projeto().id, this.projeto()).subscribe({
      next: () => {
        alert("projeto alterada com sucesso");
        this.router.navigate(["/projetos"]);
      },
      error: erro => {
        console.error("Não foi possível alterar a projeto", erro);
        alert("Erro ao alterar a projeto");
      }
    })
  }
}
