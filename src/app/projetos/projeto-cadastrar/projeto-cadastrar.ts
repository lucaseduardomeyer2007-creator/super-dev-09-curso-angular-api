import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjetoService } from '../../services/projeto.service';
import { ProjetoModel } from '../../models/projeto.model';

@Component({
  selector: 'app-projeto-cadastrar',
  imports: [FormsModule],
  templateUrl: './projeto-cadastrar.html',
  styleUrl: './projeto-cadastrar.scss',
})
export class ProjetoCadastrar {
private readonly projetoService = inject(ProjetoService)
private readonly router = inject(Router);
  projeto = signal<ProjetoModel>({
    id: crypto.randomUUID(),
    nome: "",
    codigoProjeto: "",
    custoEstimado: null
  })

  salvar(): void {
    this.projetoService.cadastrar(this.projeto()).subscribe({
      next: () => {
        alert("projeto cadastrado com sucesso");
        this.router.navigate(["/projetos"]);
      },
      error: erro => {
        console.error("Erro ao cadastrar o projeto: " + erro);
        alert("Ocorreu um erro ao cadastrar o projeto");
      }
    })
  }

}
