import { Component, effect, inject } from '@angular/core';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent {

  private service = inject(CategoryService)

  categorias = Array<any>([])

  constructor()
  {

    effect(()=>{
      this.categorias = this.service.categorias()
    })
  }

}
